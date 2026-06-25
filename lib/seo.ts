import { Metadata } from 'next';

interface SEOData {
  title?: string;
  metaDesc?: string;
  canonical?: string;

  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: {
    sourceUrl?: string;
  };

  twitterTitle?: string;
  twitterDescription?: string;
}

export function createMetadata(seo?: SEOData): Metadata {
  const title = seo?.title || '';
  const description = seo?.metaDesc || '';

  return {
    title,
    description,

    alternates: seo?.canonical
      ? {
          canonical: seo.canonical,
        }
      : undefined,

    openGraph: {
        title: seo?.opengraphTitle || seo?.title,
        description: seo?.opengraphDescription || seo?.metaDesc,
        images: seo?.opengraphImage?.sourceUrl
            ? [
                {
                url: seo.opengraphImage.sourceUrl,
                },
            ]
            : [],
        },

        twitter: {
        card: 'summary_large_image',
        title: seo?.twitterTitle || seo?.title,
        description: seo?.twitterDescription || seo?.metaDesc,
        images: seo?.opengraphImage?.sourceUrl
            ? [seo.opengraphImage.sourceUrl]
            : [],
        },
  };
}