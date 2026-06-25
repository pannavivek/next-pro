'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  Pagination,
  Navigation,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  clientName: string;
  company: string;
  review: string;
  rating: string;
  image: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface TestimonialSectionProps {
  title: string;
  testimonials: Testimonial[];
}

export default function TestimonialSection({
  title,
  testimonials,
}: TestimonialSectionProps) {
  if (!testimonials?.length) return null;

  return (
    <section className="py-20 md:py-28 bg-slate-950 text-white">
      <div className="container mx-auto px-4">

        {/* Section Title */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-[3px] text-sm text-yellow-400">
            Testimonials
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-4">
            {title}
          </h2>
        </div>

        <Swiper
          modules={[
            Autoplay,
            Pagination,
            Navigation,
          ]}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation
          className="testimonial-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="max-w-4xl mx-auto text-center">

                {/* Client Image */}
                <div className="relative w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white/10">
                  <Image
                    src={item.image?.node?.sourceUrl}
                    alt={
                      item.image?.node?.altText ||
                      item.clientName
                    }
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({
                    length: Number(item.rating),
                  }).map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-400 text-xl"
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review */}
                <blockquote className="text-xl md:text-3xl leading-relaxed mb-8 font-medium">
                  "{item.review}"
                </blockquote>

                {/* Client Info */}
                <div>
                  <h3 className="text-xl font-semibold">
                    {item.clientName}
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {item.company}
                  </p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}