'use client';

import { useState } from 'react';
import Image from 'next/image';

type GalleryImage = {
  sourceUrl: string;
  altText: string;
};

interface Props {
  images: GalleryImage[];
}

export default function GalleryClient({ images }: Props) {
  const [active, setActive] = useState<number | null>(null);

  if (!images?.length) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <p className="text-center">No gallery images found.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className="group overflow-hidden rounded-xl"
                aria-label={`Open image ${index + 1}`}
              >
                <div className="relative h-64 overflow-hidden rounded-xl">
                  <Image
                    src={image.sourceUrl}
                    alt={image.altText || `Gallery Image ${index + 1}`}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0  bg-black/95 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-6 text-white text-5xl leading-none hover:opacity-70"
            onClick={() => setActive(null)}
            aria-label="Close gallery"
          >
            &times;
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-6xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].sourceUrl}
              alt={images[active].altText || ''}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive(
                  active === 0 ? images.length - 1 : active - 1
                );
              }}
              className="absolute left-4 md:left-8 text-white text-5xl"
              aria-label="Previous image"
            >
              &#8249;
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive(
                  active === images.length - 1 ? 0 : active + 1
                );
              }}
              className="absolute right-4 md:right-8 text-white text-5xl"
              aria-label="Next image"
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </>
  );
}