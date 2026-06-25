
import Breadcrumb from '@/components/Breadcrumb';
import TeamSection from '@/components/TeamSection';
import { StatsSection, CTABanner } from '@/components/Sections';
import CaseStudySection from "@/components/CaseStudySection";
import { getAboutPage, getLatestCaseStudies } from '@/lib/wordpress';
import DOMPurify from 'isomorphic-dompurify';
import { createMetadata } from '@/lib/seo';


export async function generateMetadata() {
  const page = await getAboutPage();

  return createMetadata(page?.seo);
}

export default async function AboutPage() {
  const { page, teamMembers} = await getAboutPage();

  const latestCaseStudies = await getLatestCaseStudies();

  const acfAbout = page?.template?.acfAbout;

  if (!acfAbout) {
    return <p>About page data not found.</p>;
  }

  const { title, content, aboutimage } = acfAbout;
  const image = aboutimage?.node;  // ← yahan node se access karo

  return (

     <main>
      <Breadcrumb items={[{ label: 'About' }]} />
 
      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="max-w-wrap mx-auto px-6 md:px-10">
          <p className="eyebrow mb-6">About Us</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.08] max-w-3xl mb-8">
            {title}
          </h1>
          <div
            className="wysiwyg-content text-muted text-base md:text-lg leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content || ''),
            }}
          />
        </div>
      </section>
 
      {/* Image break */}
      <section className="px-6 md:px-10 mb-20 md:mb-28">
        <div className="max-w-wrap mx-auto rounded-2xl overflow-hidden bg-line">
          {image && (
            <img src={image.sourceUrl} alt={image.altText || ''} 
                className="w-full h-full object-cover"/>
          )}

        </div>
      </section>
 
      <StatsSection />
 
      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-wrap mx-auto px-6 md:px-10">
          <p className="eyebrow mb-4">What we believe</p>
          <h2 className="font-display text-3xl md:text-4xl max-w-lg mb-14">
            Three things we won&apos;t compromise on.
          </h2>
 
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: 'Evidence over opinion', body: 'Every recommendation is backed by research or data — not whoever argues loudest in the room.' },
              { title: 'Direct access', body: 'You talk to the people doing the work. No account layers, no message relay.' },
              { title: 'Ownership at handover', body: 'You leave with systems and documentation you can run without us, if you choose to.' },
            ].map((v) => (
              <div key={v.title} className="border-t border-sage pt-6">
                <h3 className="font-display text-xl mb-3">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Case Studies */}
            <CaseStudySection caseStudies={latestCaseStudies} />
 
      <TeamSection members={teamMembers} />
      <CTABanner />

    </main>
    
  );
}