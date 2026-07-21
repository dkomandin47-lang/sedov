import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") || "sedov-auto.ru";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  const title = "SEDOV — автозапчасти с точным подбором";
  const description = "Каталог автозапчастей SEDOV: подбор по VIN, проверка совместимости и доставка от 2 часов.";

  return {
    title,
    description,
    keywords: ["автозапчасти", "каталог автозапчастей", "подбор по VIN", "SEDOV"],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ru_RU",
      images: [{ url: `${baseUrl}/og.png`, width: 1734, height: 907, alt: "SEDOV — детали, которые едут дальше" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
