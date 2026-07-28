import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import ClientShell from "@/components/layout/ClientShell";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://balajisolar.in";
const phone = process.env.NEXT_PUBLIC_PHONE || "+919999999999";
const email = process.env.NEXT_PUBLIC_EMAIL || "info@balajisolar.in";
const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Balaji Solar & Auto Cleaning";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${businessName} | Own Your Power`,
    template: `%s | ${businessName}`,
  },
  description:
    "Premium solar installations and panel cleaning services that protect your investment for 25 years. Government certified. 700+ installations across India.",
  keywords: [
    "solar installation",
    "solar panel cleaning",
    "solar energy",
    "solar panels India",
    "solar AMC",
    "government solar subsidy",
    "residential solar",
    "commercial solar",
    "Delhi NCR solar",
    "Balaji Solar",
  ],
  authors: [{ name: businessName }],
  creator: businessName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: businessName,
    title: `${businessName} | Own Your Power`,
    description:
      "Premium solar installations and panel cleaning services. Government certified. 700+ installations. 25-year warranty.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: businessName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${businessName} | Own Your Power`,
    description:
      "Premium solar installations and panel cleaning services. Government certified. 700+ installations.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0A1628",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}#business`,
        name: businessName,
        description:
          "Premium solar installations and panel cleaning services that protect your investment for 25 years.",
        url: siteUrl,
        telephone: phone,
        email: email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Delhi NCR",
          addressRegion: "Delhi",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.6139,
          longitude: 77.209,
        },
        areaServed: {
          "@type": "State",
          name: "Delhi NCR",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "247",
          bestRating: "5",
        },
        priceRange: "$$",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
      {
        "@type": "Service",
        serviceType: "Solar Panel Installation",
        provider: {
          "@type": "LocalBusiness",
          name: businessName,
        },
        areaServed: {
          "@type": "State",
          name: "Delhi NCR",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Solar Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Solar Panel Installation",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Solar Panel Cleaning",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Annual Maintenance Contract",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How long does solar installation take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Residential installations typically take 3-7 days from start to finish.",
            },
          },
          {
            "@type": "Question",
            name: "Do you help with government subsidies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, we handle the complete subsidy process including MNRE application and documentation.",
            },
          },
          {
            "@type": "Question",
            name: "What warranty do you provide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "25-year performance warranty on panels, 10-year workmanship warranty, and 5-10 year inverter warranty.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
