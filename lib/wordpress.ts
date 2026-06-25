// lib/wordpress.ts
const WP_API_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL!;
// e.g. https://your-wordpress.com/graphql

async function fetchAPI(query: string, variables = {}) {
  const res = await fetch(WP_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}



// ─── HOME PAGE ───────────────────────────────────────────
export async function getHomePage() {
  const data = await fetchAPI(`
    query HomePage {
      page(id: "8", idType: DATABASE_ID) {
        title

        ${SEO_FRAGMENT}

        template {
          ... on Template_FrontPages {
            acfHome {
              herotitle
              herosubtitle
              heroContent

              heroimage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.page;
}

// ─── About PAGE ───────────────────────────────────────────
// ─── ABOUT PAGE ───────────────────────────────────────────

export async function getAboutPage() {
  const data = await fetchAPI(`
    query AboutPage {
      page(id: "24", idType: DATABASE_ID) {
        title

        ${SEO_FRAGMENT}

        template {
          ... on Template_AboutPage {
            acfAbout {
              title
              content

              aboutimage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }

      themeSettings {
        acfThemeSettings {
          teamMembers {
            name
            designation

            image {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }

      casestudies(first: 3) {
        nodes {
          title
          slug
          databaseId

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

        }
      }
    }
  `);

  return {
    page: data.page,
    teamMembers: data.themeSettings?.acfThemeSettings?.teamMembers || [],
  };
}
 

// ─────────────────────────────────────────────────────────
// SERVICES (ACF Post Type)
// ─────────────────────────────────────────────────────────
 
// Type definitions (optional but recommended for TypeScript safety)
export interface ServiceImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}
 
export interface ServiceFeature {
  featuretitle: string;
  featuredescription: string;
}
 
export interface AcfServiceFields {
  servicetitle: string;
  serviceshortdesc: string;
  serviceicon?: ServiceImage;
}
 
export interface Service {
  title: string;
  slug: string;
  databaseId: number;
  content?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  acfService: AcfServiceFields;
}
 
export async function getServicesPage() {
  const data = await fetchAPI(`
    query ServicesPage {
      page(id: "423", idType: DATABASE_ID) {
        title

        ${SEO_FRAGMENT}

        template {
          ... on Template_ServicePage {
            acfServicesPage {
              title
            }
          }
        }
      }

      services(first: 100) {
        nodes {
          title
          slug
          databaseId
          content

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

          acfService {
            servicetitle
            serviceshortdesc

            serviceicon {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `);

  return {
    page: data.page,
    services: data.services.nodes,
  };
}
// ─── SINGLE SERVICE QUERY (BY URI) ──────────────────────────
// Confirmed via GraphiQL: idType URI works with just the plain slug
// e.g. service(id: "service2", idType: URI) — no prefix needed.
// ─── SINGLE SERVICE QUERY (BY SLUG) ───────────────────────

export async function getServiceBySlug(
  slug: string
): Promise<Service | null> {
  const data = await fetchAPI(
    `
    query SingleService($uri: ID!) {
      service(id: $uri, idType: URI) {
        title
        slug
        content
        databaseId

        ${SEO_FRAGMENT}

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        acfService {
          servicetitle
          serviceshortdesc

          serviceicon {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
    `,
    {
      uri: `/services/${slug}/`,
    }
  );

  return data?.service ?? null;
}
 
// ─── ALL SERVICE SLUGS (for generateStaticParams) ──────────

// ─── ALL SERVICES ──────────────────────────────────────────

export async function getAllServices(): Promise<Service[]> {
  const data = await fetchAPI(`
    query AllServices {
      services(first: 1000) {
        nodes {
          title
          slug
          databaseId
          content

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

          acfService {
            servicetitle
            serviceshortdesc

            serviceicon {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `);

  return data.services.nodes;
}
// ─── ALL SERVICE SLUGS (for generateStaticParams) ──────────

export async function getAllServiceSlugs(): Promise<
  { slug: string }[]
> {
  const data = await fetchAPI(`
    query AllServiceSlugs {
      services(first: 1000) {
        nodes {
          slug
        }
      }
    }
  `);

  return data.services.nodes;
}
// ─── ALL Home Pages SERVICE ──────────

export async function getLatestServices(limit = 3) {
  const data = await fetchAPI(`
    query LatestServices {
      services(first: ${limit}) {
        nodes {
          title
          slug
          excerpt

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

          acfService {
            servicetitle
            serviceshortdesc

            serviceicon {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `);

  return data.services.nodes;
}
// ─────────────────────────────────────────────────────────
// BLOG (Default WordPress Posts)
// ─────────────────────────────────────────────────────────

export interface BlogPost {
  title: string;
  slug: string;
  databaseId: number;
  date: string;
  content?: string;
  excerpt?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author?: {
    node: {
      name: string;
      avatar?: { url: string };
    };
  };
  categories?: {
    nodes: { name: string; slug: string }[];
  };
}

// ─── BLOG LISTING QUERY ─────────────────────────────────────
// ─── BLOG POSTS ─────────────────────────────────────────────

export async function getPosts(
  first = 6,
  after: string | null = null
) {
  const data = await fetchAPI(
    `
    query GetPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }

        nodes {
          title
          slug
          excerpt
          date

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

          categories {
            nodes {
              name
            }
          }
        }
      }
    }
    `,
    {
      first,
      after,
    }
  );

  return {
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
  };
}

// ─── BLOG PAGE ─────────────────────────────────────────────

export async function getBlogPage() {
  const data = await fetchAPI(`
    query BlogPage {
      page(id: "blog", idType: URI) {
        title
        seo {
          title
          metaDesc
        }

        template {
          ... on Template_BlogPage {
            acfBlogPage {
              title
            }
          }
        }
      }
    }
  `);

  return data.page;
}

// ─── SINGLE BLOG POST QUERY (BY SLUG) ───────────────────────
// Default WordPress Posts support idType: SLUG directly.
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const data = await fetchAPI(
    `
    query SinglePost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        slug
        databaseId
        date
        content
        excerpt

        seo {
          title
          metaDesc
          canonical
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
          twitterTitle
          twitterDescription
          fullHead
        }

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        author {
          node {
            name
            avatar {
              url
            }
          }
        }

        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    `,
    { slug }
  );

  return data.post;
}


// ─── ALL POST SLUGS (for generateStaticParams) ──────────────
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const data = await fetchAPI(`
    query AllPostSlugs {
      posts(first: 1000) {
        nodes {
          slug
        }
      }
    }
  `);
  return data.posts.nodes;
}

// ─────────────────────────────────────────────────────────
// caseStudy (ACF Post Type)
// ─────────────────────────────────────────────────────────
 
export interface CaseStudyImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

export interface CaseStudyFeature {
  featuretitle: string;
  featuredescription: string;
}

export interface AcfCaseStudyFields {
  casestudytitle: string;
  casestudyshortdesc: string;
  casestudyicon?: CaseStudyImage;
}

export interface CaseStudy {
  title: string;
  slug: string;
  databaseId: number;
  content?: string;

  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };

  acfCasestudyies?: {
    casestudytitle: string;
    casestudyshortdesc: string;
    casestudyicon?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
  };
}
 
// ─── caseStudy LISTING QUERY ────────────────────────────────
// ─── CASE STUDY PAGE QUERY ────────────────────────────────

export async function getCaseStudiesPage(
  first = 6,
  after: string | null = null
) {
  const data = await fetchAPI(
    `
    query CaseStudiesPage($first: Int!, $after: String) {

      page(id: "416", idType: DATABASE_ID) {
        title

        ${SEO_FRAGMENT}

        template {
          ... on Template_CasestudyPage {
            acfCasestudyPage {
              title
            }
          }
        }
      }

      casestudies(
        first: $first
        after: $after
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }

        nodes {
          title
          slug
          databaseId

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

          acfCasestudyies {
            casestudytitle
            casestudyshortdesc

            casestudyicon {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
    `,
    {
      first,
      after,
    }
  );

  return {
    page: data.page,
    casestudies: data.casestudies.nodes || [],
    pageInfo: data.casestudies.pageInfo,
  };
}

// ─── single caseStudy QUERY (BY URI) ──────────────────────────
// Confirmed via GraphiQL: idType URI works with just the plain slug
// ─── SINGLE CASE STUDY ───────────────────────────────

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const data = await fetchAPI(
    `
    query SingleCaseStudy($uri: ID!) {
      casestudy(id: $uri, idType: URI) {
        title
        slug
        content
        databaseId

        ${SEO_FRAGMENT}

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        acfCasestudyies {
          casestudytitle
          casestudyshortdesc

          casestudyicon {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
    `,
    {
      uri: `/casestudy/${slug}/`,
    }
  );

  return data?.casestudy ?? null;
}

export async function getAllCaseStudySlugs(): Promise<
  { slug: string }[]
> {
  const data = await fetchAPI(`
    query AllCaseStudySlugs {
      casestudies(first: 1000) {
        nodes {
          slug
        }
      }
    }
  `);

  return data.casestudies.nodes;
}

// ─── Home Page access Casestudy ─────────────────────────────────────────────

export async function getLatestCaseStudies() {
  const data = await fetchAPI(`
    query LatestCaseStudies {
      casestudies(
        where: {
          orderby: {
            field: DATE
            order: DESC
          }
        }
      ) {
        nodes {
          title
          slug
          databaseId

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

          acfCasestudyies {
            casestudytitle
            casestudyshortdesc

            casestudyicon {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `);

  return data.casestudies.nodes.slice(0, 3);
}

// ─── GALLERY ─────────────────────────────────────────────

export async function getGalleryPage() {
  const data = await fetchAPI(`
    query GalleryPage {
      page(id: "36", idType: DATABASE_ID) {
        title
         ${SEO_FRAGMENT}
        template {
          ... on Template_GalleryPage {
            acfGallery {
              galleryitems {
                nodes {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.page;
}

// ─── CONTACT PAGE ────────────────────────────────────────

export async function getContactPage() {
  const data = await fetchAPI(`
    query ContactPage {
      page(id: "/contact-us/", idType: URI) {
        title
        content
        ${SEO_FRAGMENT}

        template {
          ... on Template_ContactPage {
            acfContactPage {
              headingTitle
              headingContent

              contactInfo {
                addDetails
                addLink {
                  title
                  url
                  target
                }
                addImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.page;
}

// ─── Team Member ───────────────────────────

export async function getTeamMembers() {
  const data = await fetchAPI(`
    query TeamMembers {
      themeSettings {
        acfThemeSettings {
          teamMembers {
            name
            designation
            image {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `);

  return (
    data?.themeSettings?.acfThemeSettings?.teamMembers || []
  );
}

// ─── HomeSlide ───────────────────────────

export async function getHomeSlides() {
  const data = await fetchAPI(`
    query HomeSlides {
      themeSettings {
        acfThemeSettings {
          slides {
            title
            subtitle
            description
            buttonText
            buttonLink {
              title
              url
              target
            }
            image {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `);

  return data?.themeSettings?.acfThemeSettings?.slides || [];
}

// ─── Testimonials ───────────────────────────

export async function getTestimonialsSection() {
  const data = await fetchAPI(`
    query TestimonialsSection {
      themeSettings {
        acfThemeSettings {
          title
          testimonials {
            clientName
            company
            review
            rating
            image {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `);

  return data?.themeSettings?.acfThemeSettings;
}
// ─── Universal SEO Query Fragment ───────────────────────────

export const SEO_FRAGMENT = `
seo {
  title
  metaDesc
  canonical
  opengraphTitle
  opengraphDescription

  opengraphImage {
    sourceUrl
  }

  twitterTitle
  twitterDescription

  fullHead
}
`;