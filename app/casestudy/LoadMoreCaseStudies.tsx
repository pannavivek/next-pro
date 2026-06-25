'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function LoadMoreCaseStudies({
  initialPosts = [],
  initialCursor = null,
  hasNextPage: initialHasNextPage = false,
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [loading, setLoading] = useState(false);

  const truncateText = (text: string, limit: number) => {
  if (!text) return '';
  return text.length > limit
    ? text.substring(0, limit) + '...'
    : text;
};

  async function loadMore() {
    if (!cursor) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/case-studies?after=${encodeURIComponent(cursor)}`
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
    } catch (error) {
      console.error('Load More Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-10 md:gap-12">
        {posts.map((study) => (
          <Link
            key={study.databaseId}
            href={`/casestudy/${study.slug}`}
            className="group block"
          >
            <div className="border rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg">

              {(
                study.featuredImage?.node?.sourceUrl ||
                study.acfCasestudyies?.casestudyicon?.node?.sourceUrl
                ) && (
                <Image
                    src={
                    study.featuredImage?.node?.sourceUrl ||
                    study.acfCasestudyies?.casestudyicon?.node?.sourceUrl
                    }
                    alt={
                    study.featuredImage?.node?.altText ||
                    study.acfCasestudyies?.casestudyicon?.node?.altText ||
                    ''
                    }
                    
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-auto mb-5 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                )}

              {/* Title */}
              <h3 className="text-2xl font-display mb-3 group-hover:text-sage transition-colors">
                {study.acfCasestudyies?.casestudytitle ||
                  study.title}
              </h3>

              {/* Description */}
              {study.acfCasestudyies?.casestudyshortdesc && (
                <p className="text-muted">
                  {truncateText(study.acfCasestudyies?.casestudyshortdesc, 120)}
                </p>
              )}
            </div>
          </Link>
        ))}
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