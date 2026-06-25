'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/casestudy', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-wrap mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-tight">
          Studio<span className="text-sage">Mark</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/80 hover:text-sage transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-ink text-bg text-sm rounded-full hover:bg-sage transition-colors"
        >
          Get in touch
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block w-6 h-px bg-ink transition-transform ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-6 h-px bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-ink transition-transform ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-line px-6 py-6 flex flex-col gap-5 bg-bg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-ink/80"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-3 bg-ink text-bg text-sm rounded-full mt-2"
            onClick={() => setOpen(false)}
          >
            Get in touch
          </Link>
        </nav>
      )}
    </header>
  );
}