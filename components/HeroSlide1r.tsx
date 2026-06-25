'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

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

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (!slides.length) return null;

  const slide = slides[index];

  return (
    <section className="relative bg-bg overflow-hidden">
      <div className="max-w-wrap mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* Content */}
        <div className="order-2 md:order-1">
          <p className="eyebrow mb-6">{slide.subtitle}</p>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight mb-6">
            {slide.title}
          </h1>

          <p className="text-muted text-base md:text-lg leading-relaxed max-w-md mb-8">
            {slide.description}
          </p>

          <div className="flex items-center gap-6">
            <a
              href={slide.buttonLink?.url || '#'}
              target={slide.buttonLink?.target || '_self'}
              className="inline-flex items-center px-6 py-3.5 bg-ink text-bg text-sm rounded-full hover:bg-sage transition-colors"
            >
              {slide.buttonText}
            </a>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-3 mt-12">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-8 bg-sage' : 'w-3 bg-line'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2 relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden bg-line">
          <Image
            src={slide.image?.node?.sourceUrl}
            alt={slide.image?.node?.altText || slide.title}
            fill
            priority
            className="object-cover"
          />

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"
          >
            ←
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}