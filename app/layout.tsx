import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://sedov-auto-parts.d-komandin47.chatgpt.site";
const title = "SEDOV — подбор автозапчастей в Балашове";
const description = "Подберём автозапчасти по VIN, проверим совместимость и предложим оригинал или надёжный аналог. Магазин SEDOV в Балашове.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["автозапчасти Балашов", "подбор запчастей по VIN", "магазин автозапчастей", "SEDOV"],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "SEDOV — детали, которые едут дальше" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
