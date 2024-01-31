import SearchContainer from "@/components/search-container";
import { getVideoSearchResults } from "@/lib/videos";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams?.q;

  const initialData = await getVideoSearchResults(query as string);

  return <SearchContainer initialData={initialData} query={query as string} /> 
}
