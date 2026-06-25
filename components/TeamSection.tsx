import Image from "next/image";

interface TeamMember {
  name: string;
  designation: string;
  image?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
}

interface TeamSectionProps {
  members: TeamMember[];
}

export default function TeamSection({
  members,
}: TeamSectionProps) {
  if (!members?.length) return null;

  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="max-w-wrap mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <p className="eyebrow mb-4">The people</p>
            <h2 className="font-display text-3xl md:text-4xl max-w-lg">
              A small team, deliberately.
            </h2>
          </div>

          <p className="text-muted max-w-sm">
            No account managers relaying messages. You work directly with the
            people doing the work.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {members.map((member, index) => (
            <div key={index}>
              <div className="aspect-3/4 rounded-xl overflow-hidden bg-line mb-4">
                {member.image?.node?.sourceUrl ? (
                  <Image
                    src={member.image.node.sourceUrl}
                    alt={
                      member.image.node.altText ||
                      member.name
                    }
                    width={600}
                    height={800}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              <p className="font-display text-lg">
                {member.name}
              </p>

              <p className="text-xs text-muted font-mono mt-1">
                {member.designation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}