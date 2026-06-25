import {
  getServiceBySlug,
  getAllServiceSlugs,
  getAllServices,
} from '@/lib/wordpress';

import Breadcrumb from '@/components/Breadcrumb';
import RelatedServicesSlider from '@/components/RelatedServicesSlider';
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

  const service = await getServiceBySlug(slug);

  return createMetadata(service?.seo);
}



// Static Routes
export async function generateStaticParams() {
  const services = await getAllServiceSlugs();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function SingleServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

  if (!service) {
    return (
      <main className="max-w-wrap mx-auto px-6 md:px-10 py-24">
        <p className="text-muted">Service not found.</p>
      </main>
    );
  }

  const acf = service.acfService;
  const icon = acf?.serviceicon?.node;
  const featured = service.featuredImage?.node;

  const title =
    acf?.servicetitle || service.title;

  // Related Services
  const allServices = await getAllServices();

  const relatedServices = allServices
  .filter((s) => s.slug !== slug)
  .slice(0, 6);
  
  return (
    <main>
      <Breadcrumb
          items={[
            {
              label: 'Services',
              href: '/services',
            },
            {
              label: service.title,
            },
          ]}
        />

      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="max-w-wrap mx-auto px-6 md:px-10">
          <div className="flex items-center gap-5 mb-8">
            {icon && (
              <img
                src={icon.sourceUrl}
                alt={icon.altText || title}
                className="w-14 h-14 rounded-xl object-cover"
              />
            )}

            <p className="eyebrow">Service</p>
          </div>

          <h1 className="font-display text-4xl md:text-6xl leading-[1.08] max-w-3xl mb-6">
            {title}
          </h1>

          {acf?.serviceshortdesc && (
            <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed">
              {acf.serviceshortdesc}
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

      {/* Content */}
      {service.content && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-wrap mx-auto px-6 md:px-10">
            <div className="w-full">
              <div
                className="wysiwyg-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    service.content
                  ),
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-20 md:py-28 border-t border-line">
            <div className="max-w-wrap mx-auto px-6 md:px-10">
              <p className="eyebrow mb-4">
                Explore More
              </p>

              <h2 className="font-display text-3xl md:text-4xl mb-12">
                Other Services
              </h2>

              <RelatedServicesSlider
                services={relatedServices}
              />
            </div>
          </section>
        )}
      <CTABanner />
    </main>
  );
}