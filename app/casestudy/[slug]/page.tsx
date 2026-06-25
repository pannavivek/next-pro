import {
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
} from '@/lib/wordpress';

import Breadcrumb from '@/components/Breadcrumb';
import { CTABanner } from '@/components/Sections';
import { createMetadata } from '@/lib/seo';

import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

// SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const caseStudy = await getCaseStudyBySlug(slug);

  return createMetadata(caseStudy?.seo);
}

// Static Params
export async function generateStaticParams() {
  const items = await getAllCaseStudySlugs();

  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function SingleCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cs = await getCaseStudyBySlug(slug);

  if (!cs) {
    return (
      <main className="max-w-wrap mx-auto px-6 md:px-10 py-24">
        <p className="text-muted">Case study not found.</p>
      </main>
    );
  }

  const acf = cs.acfCasestudyies;
  const featured = cs.featuredImage?.node;
  const icon = acf?.casestudyicon?.node;

  const title = acf?.casestudytitle || cs.title;

  return (
    <main>
      <Breadcrumb
        items={[
          {
            label: 'Case Studies',
            href: '/casestudy',
          },
          {
            label: cs.title,
          },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="max-w-wrap mx-auto px-6 md:px-10">
          <h1 className="font-display text-4xl md:text-6xl leading-[1.08] max-w-3xl mb-8">
            {title}
          </h1>

          {acf?.casestudyshortdesc && (
            <p className="text-lg text-muted max-w-2xl">
              {acf.casestudyshortdesc}
            </p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {featured && (
        <section className="px-6 md:px-10 mb-16 md:mb-20">
          <div className="max-w-wrap mx-auto relative aspect-[16/8] rounded-2xl overflow-hidden">
            <Image
              src={featured.sourceUrl}
              alt={featured.altText || title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Icon */}
      {icon && (
        <section className="pb-12">
          <div className="max-w-wrap mx-auto px-6 md:px-10">
            <img
              src={icon.sourceUrl}
              alt={icon.altText || title}
              width={120}
              height={120}
            />
          </div>
        </section>
      )}

      {/* Content */}
      {cs.content && (
        <section className="py-16 md:py-20 border-t border-line">
          <div className="max-w-wrap mx-auto px-6 md:px-10">
            <div className="max-w-3xl">
              <div
                className="wysiwyg-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(cs.content),
                }}
              />
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </main>
  );
}
