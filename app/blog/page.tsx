import { getPosts, getBlogPage } from '@/lib/wordpress';
import Breadcrumb from '@/components/Breadcrumb';
import { createMetadata } from '@/lib/seo';
import LoadMoreBlogs from './LoadMoreBlogs';

// SEO
export async function generateMetadata() {
  const page = await getBlogPage();

  return createMetadata(page?.seo);
}

export default async function BlogPage() {
  const [postsData, page] = await Promise.all([
    getPosts(6),
    getBlogPage(),
  ]);

  const pageTitle =
    page?.template?.acfBlogPage?.title ||
    page?.title ||
    'Blog';

  return (
    <main>
      <Breadcrumb items={[{ label: pageTitle }]} />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-wrap mx-auto px-6 md:px-10">
          <p className="eyebrow mb-6">Blog</p>

          <h1 className="font-display text-4xl md:text-6xl leading-[1.08] max-w-3xl">
            {pageTitle}
          </h1>
        </div>
        {/* Posts Grid */}
       <LoadMoreBlogs
          initialPosts={postsData.posts}
          initialCursor={postsData.pageInfo.endCursor}
          hasNextPage={postsData.pageInfo.hasNextPage}
        />
      </section>

      
    </main>
  );
}