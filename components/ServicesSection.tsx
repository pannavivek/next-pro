import Image from 'next/image';
import Link from 'next/link';

interface Service {
  title: string;
  slug: string;
  excerpt?: string;

  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };

  acfService?: {
    servicetitle?: string;
    serviceshortdesc?: string;

    serviceicon?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
  };
}

interface Props {
  services: Service[];
}

const truncateText = (text: string, limit: number) => {
  if (!text) return '';
  return text.length > limit
    ? text.substring(0, limit) + '...'
    : text;
};

export default function ServicesSection({ services }: Props) {
  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="max-w-wrap mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="eyebrow mb-4">What we do</p>

            <h2 className="font-display text-3xl md:text-4xl">
              Three disciplines, one team.
            </h2>
          </div>

          <Link
            href="/services"
            className="text-sm underline underline-offset-4 hover:text-sage"
          >
            View all services
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const image =
                service.acfService?.serviceicon?.node ||
                service.featuredImage?.node;

            return (
                <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
                >
                <article className="rounded-3xl overflow-hidden border border-line">
                    {image && (
                    <div className="relative aspect-[4/3]">
                        <Image
                        src={image.sourceUrl}
                        alt={image.altText || service.title}
                        fill
                        className="object-cover"
                        />
                    </div>
                    )}

                    <div className="p-6">
                    <h3 className="text-2xl font-display mb-3">
                        {service.acfService?.servicetitle || service.title}
                    </h3>

                    <p className="text-muted line-clamp-3">
                          {truncateText(service.acfService?.serviceshortdesc, 120)}
                    </p>
                    </div>
                </article>
                </Link>
            );
            })}
        </div>
      </div>
    </section>
  );
}