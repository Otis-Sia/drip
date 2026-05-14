import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/shop/checkout/"],
      },
    ],
    sitemap: "https://afrodrip.co.ke/sitemap.xml",
  };
}
