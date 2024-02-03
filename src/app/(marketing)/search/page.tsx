import SearchContainer from "@/components/search-container";
import { getVideoSearchResults } from "@/lib/videos";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: any): Promise<Metadata> {
  const { q } = searchParams;
  return {
    title: `${q} | search on tutsy`,
    description: "YouTube Learning, reinvented."
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams?.q;

  const initialData = await getVideoSearchResults(query as string);

  return <SearchContainer initialData={initialData} query={query as string} />;
}
