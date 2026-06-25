import Breadcrumb from '@/components/Breadcrumb';
import { CTABanner } from '@/components/Sections';
import { getCaseStudiesPage } from '@/lib/wordpress';
import { createMetadata } from '@/lib/seo';
import LoadMoreCaseStudies from './LoadMoreCaseStudies';

export async function generateMetadata() {
  const { page } = await getCaseStudiesPage();

  return createMetadata(page?.seo);
}

export default async function CaseStudyPage() {
  let pageData = null;
  let caseStudies = [];
  let pageInfo = null;

  try {
    const data = await getCaseStudiesPage(6);

    pageData = data.page;
    caseStudies = data.casestudies;
    pageInfo = data.pageInfo;
  } catch (error) {
    console.error(
      'Case Study Page Error:',
      error
    );
  }

  return (
    <main>
      <Breadcrumb
        items={[{ label: 'Case Studies' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-wrap mx-auto px-6 md:px-10">
          <p className="eyebrow mb-6">
            Proof of work
          </p>

          <h1 className="font-display text-4xl md:text-6xl leading-[1.08] max-w-2xl">
            {pageData?.template?.acfCasestudyPage
              ?.title ||
              'Our Case Studies'}
          </h1>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="max-w-wrap mx-auto px-6 md:px-10">
          <LoadMoreCaseStudies
            initialPosts={caseStudies}
            initialCursor={
              pageInfo?.endCursor
            }
            hasNextPage={
              pageInfo?.hasNextPage
            }
          />
        </div>
      </section>

      <CTABanner />
    </main>
  );
}