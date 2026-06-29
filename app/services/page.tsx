import { getServicesPage } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';
//import DOMPurify from 'isomorphic-dompurify';

import Breadcrumb from '@/components/Breadcrumb';
import { CTABanner } from '@/components/Sections';

import { createMetadata } from '@/lib/seo';

// SEO
export async function generateMetadata() {
const { page } = await getServicesPage();
return createMetadata(page?.seo);
}

export default async function ServicesPage() {
const { page, services } = await getServicesPage();

return ( <main>
<Breadcrumb items={[{ label: 'Services' }]} />
  {/* Hero Section */}
  <section className="py-16 md:py-24">
    <div className="max-w-wrap mx-auto px-6 md:px-10">
      <p className="eyebrow mb-6">What we do</p>

      <h1 className="font-display text-4xl md:text-6xl leading-[1.08] max-w-2xl mb-6">
        {page?.template?.acfServicesPage?.title ||
          'Our Services'}
      </h1>

      <p className="text-muted text-base md:text-lg max-w-xl">
        Pick a discipline, or combine a few — most engagements end up
        blending two or three of these.
      </p>
    </div>
  </section>

  {/* Service Cards */}
  <section className="pb-20 md:pb-28">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((s: any) => {
          const icon = s.acfService?.serviceicon?.node;
          const featured = s.featuredImage?.node;

          return (
            <Link
              key={s.databaseId}
              href={`/services/${s.slug}`}
              className="group"
            >
              <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                {featured && (
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={featured.sourceUrl}
                      alt={featured.altText || s.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6">

                  {icon && (
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                      <Image
                        src={icon.sourceUrl}
                        alt={icon.altText || s.title}
                        width={40}
                        height={40}
                      />
                    </div>
                  )}

                  <h3 className="mb-3 text-2xl font-bold text-gray-900">
                    {s.acfService?.servicetitle || s.title}
                  </h3>

                  {s.acfService?.serviceshortdesc && (
                    <p className="mb-4 text-gray-600 line-clamp-3">
                      {s.acfService.serviceshortdesc}
                    </p>
                  )}

                  <div className="mt-6">
                    <span className="inline-flex items-center font-semibold text-primary transition-all group-hover:translate-x-1">
                      Learn More →
                    </span>
                  </div>

                </div>
              </article>
            </Link>
          );
        })}
      </div>
  </section>

  <CTABanner />

  
</main>

);
}
