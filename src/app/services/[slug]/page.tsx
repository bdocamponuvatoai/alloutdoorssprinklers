import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ServiceDetails, ServiceIntro, ServiceProcess } from "@/components/services/service-detail";
import { getService, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

// Only the services in content/services.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    path: `/services/${service.slug}`,
    description: service.description,
    image: service.image,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return (
    <>
      <ServiceIntro service={service} />
      <ServiceDetails service={service} />
      <ServiceProcess service={service} />
      <ClosingCta />
    </>
  );
}
