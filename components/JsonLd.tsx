export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Afrodrip Limited",
    url: "https://afrodrip.co.ke",
    logo: "https://afrodrip.co.ke/afrodrip.svg",
    description:
      "Empowering farmers with cutting-edge greenhouse systems, efficient irrigation, and climate-smart farming technologies across Kenya and East Africa.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    sameAs: [
      "https://www.facebook.com/share/1CiLi5Nef3/",
      "https://www.instagram.com/afrodrip254?igsh=MWwwb3BrazhyaWxrcw==",
      "https://www.tiktok.com/@afrodripltd?is_from_webapp=1&sender_device=pc"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English", "Swahili"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Afrodrip Limited",
    url: "https://afrodrip.co.ke",
    description:
      "Climate-smart agricultural solutions – greenhouse systems, irrigation, and farming technologies.",
    publisher: {
      "@type": "Organization",
      name: "Afrodrip Limited",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
