'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: {
    url: string;
    target?: string;
  };
  image: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface HeroSliderProps {
  slides: Slide[];
}

export default function HeroSlider({
  slides,
}: HeroSliderProps) {
  if (!slides?.length) return null;

  return (
    <section className="relative">
      <Swiper
        modules={[
          Autoplay,
          Navigation,
          Pagination,
          EffectFade,
        ]}
        slidesPerView={1}
        loop
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{
          clickable: true,
        }}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative min-h-[700px]">
              
              {/* Background Image */}
              <Image
                src={slide.image.node.sourceUrl}
                alt={
                  slide.image.node.altText ||
                  slide.title
                }
                fill
                priority={index === 0}
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 max-w-wrap mx-auto px-6 md:px-10 min-h-[700px] flex items-center">
                <div className="max-w-3xl text-white">
                  <span className="inline-block mb-4 text-sm uppercase tracking-[3px]">
                    {slide.subtitle}
                  </span>

                  <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl mb-8 max-w-2xl">
                    {slide.description}
                  </p>

                  <a
                    href={slide.buttonLink?.url || '#'}
                    target={
                      slide.buttonLink?.target ||
                      '_self'
                    }
                    className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}