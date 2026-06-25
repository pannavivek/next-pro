import HeroSlider from '@/components/HeroSlider';
import TeamSection from "@/components/TeamSection";
import TestimonialSection from '@/components/TestimonialSection';
import { StatsSection, ProcessSection, CTABanner } from '@/components/Sections';
import HomeHero from "@/components/HomeHero";
import ServicesSection from "@/components/ServicesSection";
import CaseStudySection from "@/components/CaseStudySection";

import { getHomePage, getTeamMembers, getHomeSlides, getTestimonialsSection, getLatestCaseStudies, getLatestServices } from '@/lib/wordpress';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata() {
  const page = await getHomePage();

  return createMetadata(page?.seo);
}

export default async function HomePage() {
  const page = await getHomePage();
  const members = await getTeamMembers();
  const slides = await getHomeSlides();

  const testimonialData = await getTestimonialsSection();
  const services = await getLatestServices(6);
  const latestCaseStudies = await getLatestCaseStudies();
  
  const hero = page?.template?.acfHome;

  if (!hero) {
    return <p>Home page data not found.</p>;
  }

  return (

    <main>
      <HeroSlider slides={slides} />

       <HomeHero
        herotitle={hero?.herotitle}
        herosubtitle={hero?.herosubtitle}
        heroContent={hero?.heroContent}
        heroimage={hero?.heroimage}
      />
 
      <StatsSection />
 
       <ServicesSection services={services} />
 
      <ProcessSection />
 
      {/* Case Studies */}
      <CaseStudySection caseStudies={latestCaseStudies} />
 
      <TeamSection members={members} />
      <TestimonialSection
        title={testimonialData.title}
        testimonials={testimonialData.testimonials}
      />
      <CTABanner />

      
    </main>
    
  );
}