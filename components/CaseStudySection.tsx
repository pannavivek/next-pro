import Link from "next/link";
import Image from "next/image";

interface Props {
  caseStudies: any[];
}

export default function CaseStudySection({
  caseStudies,
}: Props) {
  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="max-w-wrap mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <p className="eyebrow mb-4">Proof of work</p>

            <h2 className="font-display text-3xl md:text-4xl max-w-lg">
              Recent case studies.
            </h2>
          </div>

          <Link
            href="/casestudy"
            className="text-sm underline underline-offset-4 hover:text-sage shrink-0"
          >
            View all case studies
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((item) => (
            <Link
              key={item.databaseId}
              href={`/casestudy/${item.slug}`}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl mb-5">
                {item.featuredImage?.node?.sourceUrl && (
                  <Image
                    src={item.featuredImage.node.sourceUrl}
                    alt={
                      item.featuredImage.node.altText ||
                      item.title
                    }
                    width={600}
                    height={400}
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                  />
                )}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.acfCasestudyies?.casestudytitle ||
                  item.title}
              </h3>
              <p className="text-gray-600 line-clamp-3">
                {item.acfCasestudyies?.casestudyshortdesc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}