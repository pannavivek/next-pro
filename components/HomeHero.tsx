import Image from "next/image";

interface HomeHeroProps {
  herotitle: string;
  herosubtitle: string;
  heroContent: string;

  heroimage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

export default function HomeHero({
  herotitle,
  herosubtitle,
  heroContent,
  heroimage,
}: HomeHeroProps) {
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Image */}
          <div className="relative">
            <div className="relative h-[600px] overflow-hidden rounded-3xl">
              {heroimage?.node?.sourceUrl && (
                <Image
                  src={heroimage.node.sourceUrl}
                  alt={
                    heroimage.node.altText || herotitle
                  }
                  fill
                  priority
                  className="object-cover relative"
                />
              )}
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-2xl p-6 max-w-xs">
              <h4 className="text-3xl font-bold">
                5K+
              </h4>
              <p className="text-gray-600">
                Happy Guests Worldwide
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <span className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              {herosubtitle}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {herotitle}
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {heroContent}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition"
              >
                Book Your Stay
              </a>

              <a
                href="/about"
                className="px-8 py-4 border border-gray-300 rounded-full hover:bg-gray-100 transition"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <h3 className="text-3xl font-bold">
                  15+
                </h3>
                <p className="text-gray-500 text-sm">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  50+
                </h3>
                <p className="text-gray-500 text-sm">
                  Luxury Rooms
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  4.9★
                </h3>
                <p className="text-gray-500 text-sm">
                  Guest Rating
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}