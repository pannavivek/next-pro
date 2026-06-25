'use client';

import { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { BlogCard } from '@/components/Cards';

interface BlogPost {
  title: string;
  slug: string;
  excerpt?: string;
  date: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
  categories?: {
    nodes?: {
      name: string;
    }[];
  };
}

interface LoadMoreBlogsProps {
  initialPosts: BlogPost[];
  initialCursor: string | null;
  hasNextPage: boolean;
}

export default function LoadMoreBlogs({
  initialPosts,
  initialCursor,
  hasNextPage: initialHasNextPage,
}: LoadMoreBlogsProps) {
  const [posts, setPosts] = useState<BlogPost[]>(
    initialPosts || []
  );

  const [cursor, setCursor] = useState<string | null>(
    initialCursor
  );

  const [hasNextPage, setHasNextPage] =
    useState<boolean>(initialHasNextPage);

  const [loading, setLoading] =
    useState<boolean>(false);

  async function loadMore() {
    if (!cursor) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/posts?after=${encodeURIComponent(
          cursor
        )}`
      );

      if (!res.ok) {
        throw new Error('Failed to load posts');
      }

      const data = await res.json();

      setPosts((prev) => [
        ...prev,
        ...(data.nodes || []),
      ]);

      setCursor(
        data.pageInfo?.endCursor || null
      );

      setHasNextPage(
        data.pageInfo?.hasNextPage || false
      );
    } catch (error) {
      console.error(
        'Load More Posts Error:',
        error
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
              image={
                post.featuredImage?.node?.sourceUrl
              }
              date={new Date(
                post.date
              ).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              category={
                post.categories?.nodes?.[0]?.name ||
                ''
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
            className="px-6 py-3 border rounded-lg hover:bg-black hover:text-white transition-colors disabled:opacity-50"
          >
            {loading
              ? 'Loading...'
              : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
}