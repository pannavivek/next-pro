import { getPostBySlug, getAllPostSlugs } from '@/lib/wordpress';
import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

import { createMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog: any = await getPostBySlug(slug);

  return createMetadata(blog?.seo);
}


export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <main className="max-w-wrap mx-auto px-6 md:px-10 py-24">
        <p className="text-muted">Post not found.</p>
      </main>
    );
  }

  const featured = post.featuredImage?.node;
  const author = post.author?.node;
  const category = post.categories?.nodes?.[0];
  console.log(post.content);

  return (
    <main>
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

      <article className="py-16 md:py-20">
        <div className="max-w-wrap mx-auto px-6 md:px-10">
          <div className="max-w-2xl mx-auto">
            {category && <p className="eyebrow mb-6 justify-center">{category.name}</p>}

            <h1 className="font-display text-3xl md:text-5xl leading-[1.1] text-center mb-8">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-3 text-sm text-muted font-mono mb-12">
              {author?.name && <span>{author.name}</span>}
              {author?.name && <span>·</span>}
              <span>
                {new Date(post.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Featured image */}
        {featured && (
          <div className="px-6 md:px-10 mb-12 md:mb-16">
            <div className="max-w-wrap mx-auto aspect-[16/8] rounded-2xl overflow-hidden bg-line relative">
              <Image
                src={featured.sourceUrl}
                alt={featured.altText || post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-wrap mx-auto px-6 md:px-10">
          <div className="max-w-2xl mx-auto">
            {post.content && (
              <div
                className="wysiwyg-content"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              />
            )}
          </div>
        </div>
      </article>
    </main>
  );
}