'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function RelatedServicesSlider({
  services,
}: {
  services: any[];
}) {
  return (
    <Swiper
      modules={[
        Navigation,
        Pagination,
        Autoplay,
      ]}
      spaceBetween={24}
      navigation
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      }}
    >
      {services.map((item) => {
        const image =
          item.featuredImage?.node;

        return (
          <SwiperSlide key={item.slug}>
            <Link
              href={`/services/${item.slug}`}
              className="group block h-full"
            >
              <article className="h-full overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                {image && (
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={image.sourceUrl}
                      alt={
                        image.altText ||
                        item.title
                      }
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-display mb-3">
                    {item.acfService
                      ?.servicetitle ||
                      item.title}
                  </h3>

                  <p className="text-muted line-clamp-3 mb-5">
                    {
                      item.acfService
                        ?.serviceshortdesc
                    }
                  </p>

                  <span className="inline-flex items-center font-medium">
                    Learn More →
                  </span>
                </div>
              </article>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}