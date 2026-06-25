import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from './ContactForm';
import Link from 'next/link';

import { getContactPage } from '@/lib/wordpress';
import { createMetadata } from '@/lib/seo';
import Image from 'next/image';

export async function generateMetadata() {
  const page = await getContactPage();
  return createMetadata(page?.seo);
}

export default async function ContactPage() {
  const page = await getContactPage();

  const acf = page?.template?.acfContactPage;

  return (
    <main>
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 md:gap-20">
          {/* Left */}
          <div>
            <p className="eyebrow mb-6">Get in touch</p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8">
              {acf?.headingTitle || page?.title}
            </h1>

            <p className="text-muted leading-relaxed mb-12 max-w-md">
              {acf?.headingContent}
            </p>

            {acf?.contactInfo?.length > 0 && (
              <div className="space-y-6 border-t border-gray-200 pt-8">
                {acf?.contactInfo?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-4 border-b border-gray-200"
                  >
                    {item.addImage?.node?.sourceUrl && (
                      <Image
                        src={item.addImage.node.sourceUrl}
                        alt={item.addImage.node.altText || ''}
                        width={48}
                        height={48}
                      />
                    )}

                    <Link
                        href={item.addLink?.url || '#'}
                        target={item.addLink?.target || '_self'}
                      >
                        {item.addLink?.title || item.addDetails}
                      </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right */}
          <ContactForm />
        </div>
      </section>

      {/* Map */}
      {acf?.mapEmbedUrl && (
        <section className="px-6 md:px-10 pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden">
            <iframe
              src={acf.mapEmbedUrl}
              width="100%"
              height="500"
              loading="lazy"
              className="border-0 w-full"
            />
          </div>
        </section>
      )}
    </main>
  );
}