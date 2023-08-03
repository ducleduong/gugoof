import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
} from "@nextui-org/react";
import { getSearchResult } from "../../api/SearchApi";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRemoveFormat, FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

type Props = {
  search: string;
};

type Result = {
  description: string;
  position: number;
  title: string;
  url: string;
};

type Info = {
  title: string;
  labels: string[];
};

type KnowledgePanel = {
  description: {
    site: string;
    text: string;
    url: string;
  };
  image: {
    url: string;
    height: number;
    width: number;
    page_url: string;
  };
  info: Info[];
  label: string;
  name: string;
};

type SearchResult = {
  related_keywords: {
    keywords: string[] | null;
    spelling_suggestions: string | null;
    spelling_suggestions_html: string | null;
  };
  results: Result[];
  knowledge_pandel: KnowledgePanel | null;
};

function ResultSection({ search }: Props) {
  const [searchResult, setSearchResult] = useState<SearchResult>();
  const [searchQuery, setSearchQuery] = useState<string>(search);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchSearchData = async () => {
      const data = await getSearchResult(search);
      if (data?.data) {
        setSearchResult(data.data);
        setLoading(false);
      }
    };
    fetchSearchData();
  }, [search]);
  return (
    <div className="p-10">
      <div className="flex">
        <div className="rounded-full text-xl flex items-center py-4 px-10 shadow-2xl bg-slate-50 w-2/3 me-10">
          <FaSearch />
          <input
            type="text"
            className="bg-transparent w-full outline-none ms-5"
            placeholder="Search everything... from Google"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <FaRemoveFormat
              className="cursor-pointer"
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
        <button
          className="bg-gradient-to-bl from-slate-50 to-slate-100 font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300 ease-in-out hover:scale-110"
          onClick={() => {
            if (searchQuery !== "") {
              setLoading(true);
              router.push(`?search=${searchQuery}`)
            };
          }}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-5 p-10">
      {loading ? <CircularProgress size="lg" aria-label="Loading..." color="default"/> :
        searchResult?.results?.map((result: any, index: number) => (
          <Card className="max-w-[320px] m-2" key={index}>
            <CardHeader className="flex gap-3 h-24">
              <p className="text-md">{result.title}</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>{result.description}</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link href={result.url}>
                <Button>Visit</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ResultSection;
