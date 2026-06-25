import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="max-w-wrap mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <p className="font-display text-xl mb-3">
              Studio<span className="text-sage">Mark</span>
            </p>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              A strategy and design partner for businesses that take their
              next chapter seriously.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-ink/80 hover:text-sage">About</Link></li>
              <li><Link href="/services" className="text-ink/80 hover:text-sage">Services</Link></li>
              <li><Link href="/casestudy" className="text-ink/80 hover:text-sage">Case Studies</Link></li>
              <li><Link href="/blog" className="text-ink/80 hover:text-sage">Blog</Link></li>
              <li><Link href="/gallery" className="text-ink/80 hover:text-sage">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2.5 text-sm text-ink/80">
              <li>hello@studiomark.com</li>
              <li>+91 98765 43210</li>
              <li>Indore, Madhya Pradesh</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} StudioMark. All rights reserved.</p>
          <p>Built with care.</p>
        </div>
      </div>
    </footer>
  );
}