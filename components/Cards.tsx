import Link from 'next/link';

export function ServiceCard({
  title,
  description,
  href,
  index,
}: {
  title: string;
  description: string;
  href: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group block border-t border-line py-8 transition-colors hover:bg-ink/[0.02]"
    >
      <div className="flex items-start gap-6 md:gap-10">
        <span className="font-mono text-xs text-muted pt-1.5 w-8 shrink-0">
          {String(index).padStart(2, '0')}
        </span>
        <div className="flex-1">
          <h3 className="font-display text-2xl md:text-3xl mb-2 group-hover:text-sage transition-colors">
            {title}
          </h3>
          <p className="text-muted leading-relaxed max-w-lg">{description}</p>
        </div>
        <span className="hidden md:inline text-2xl text-muted group-hover:text-sage group-hover:translate-x-1 transition-all pt-1">
          →
        </span>
      </div>
    </Link>
  );
}

export function BlogCard({
  title,
  excerpt,
  image,
  date,
  category,
  href,
}: {
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  category?: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-line mb-5">
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sage/10 to-brass/10" />
        )}
      </div>
      {category && <p className="eyebrow mb-3">{category}</p>}
      <h3 className="font-display text-xl mb-2 leading-snug group-hover:text-sage transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-3 line-clamp-2">{excerpt}</p>
      <p className="text-xs font-mono text-muted">{date}</p>
    </Link>
  );
}

export function CaseStudyCard({
  title,
  client,
  image,
  result,
  href,
}: {
  title: string;
  client: string;
  image?: string;
  result?: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-line mb-5 relative">
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sage/10 to-brass/10" />
        )}
        {result && (
          <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-bg text-xs font-mono">
            {result}
          </span>
        )}
      </div>
      <p className="eyebrow mb-3">{client}</p>
      <h3 className="font-display text-2xl group-hover:text-sage transition-colors">{title}</h3>
    </Link>
  );
}