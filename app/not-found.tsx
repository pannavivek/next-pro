import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="eyebrow mb-4">404 Error</p>

        <h1 className="font-display text-5xl md:text-7xl mb-6">
          Page Not Found
        </h1>

        <p className="text-muted mb-8">
          Sorry, the page you are looking for doesn't exist
          or has been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-black text-white"
          >
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg border"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}