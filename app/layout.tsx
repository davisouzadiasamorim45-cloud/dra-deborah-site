import type { Metadata } from "next";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/urbanist/300.css";
import "@fontsource/urbanist/400.css";
import "@fontsource/urbanist/500.css";
import "@fontsource/urbanist/600.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Tratamentos de Estética em Caxias - Resultados Naturais | Déborah Carvalho",
    template: "%s | Déborah Carvalho",
  },
  description:
    "Descubra nossos tratamentos de estética em Caxias, especializados em oferecer resultados naturais e atendimento personalizado. Qualidade profissional para o seu bem-estar.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Déborah Carvalho",
    images: ["/images/home/hero.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Clínica Déborah Carvalho",
  url: site.url,
  telephone: "+55 99 98161-3055",
  sameAs: [site.instagram, whatsappLink()],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "12:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:00", closes: "18:00" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="pular" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
