'use client';

import { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { BlogCard } from '@/components/Cards';

export default function LoadMoreBlogs({
  initialPosts = [],
  initialCursor = null,
  hasNextPage: initialHasNextPage = false,
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    if (!cursor) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/posts?after=${encodeURIComponent(cursor)}`
      );

      const data = await res.json();

      setPosts((prev) => [
        ...prev,
        ...(data.nodes || []),
      ]);

      setCursor(data.pageInfo?.endCursor || null);
      setHasNextPage(
        data.pageInfo?.hasNextPage || false
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {posts.map((post) => {
          const excerptText = post.excerpt
            ? DOMPurify.sanitize(post.excerpt, {
                ALLOWED_TAGS: [],
              })
            : '';

          return (
            <BlogCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              title={post.title}
              excerpt={excerptText}
              image={post.featuredImage?.node?.sourceUrl}
              date={new Date(post.date).toLocaleDateString(
                'en-IN',
                {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }
              )}
              category={
                post.categories?.nodes?.[0]?.name
              }
            />
          );
        })}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 border rounded-lg"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
}