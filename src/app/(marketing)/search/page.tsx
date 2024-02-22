import SearchContainer from "@/components/search-container";
import { getVideoSearchResults } from "@/lib/videos";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  searchParams,
}: any): Promise<Metadata> {
  const { q } = searchParams;

  const title = q ? `${q} | search on tutsy` : 'Tutsy | Not Found';

  return {
    title,
    description: "YouTube Learning, reinvented.",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams?.q as string;

  if (!query || query.trim().length === 0) {
    return notFound();
  }

  const initialData = await getVideoSearchResults(query as string);

  return <SearchContainer initialData={initialData} query={query as string} />;
}
