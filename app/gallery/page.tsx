import Breadcrumb from '@/components/Breadcrumb';
import GalleryClient from './GalleryClient';

import { getGalleryPage } from '@/lib/wordpress';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata() {
  const page = await getGalleryPage();
  return createMetadata(page?.seo);
}

export default async function GalleryPage() {
  const page = await getGalleryPage();

  const images =
    page?.template?.acfGallery?.galleryitems?.nodes || [];

  return (
    <main>
      <Breadcrumb items={[{ label: 'Gallery' }]} />

      <section className="py-16 md:py-24">
        <div className="max-w-wrap mx-auto px-6 md:px-10">
          <p className="eyebrow mb-6">Gallery</p>

          <h1 className="font-display text-4xl md:text-6xl leading-[1.08]">
            Our Gallery
          </h1>
        </div>
      </section>

      <GalleryClient images={images} />
    </main>
  );
}