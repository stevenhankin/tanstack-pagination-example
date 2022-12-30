import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { QueryKey, useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type CharacterResponse = {
  results: Character[];
  next: string;
  previous: string;
};

type Character = {
  name: string;
};

function assertIsCharacterResponse(
  response: any
): asserts response is CharacterResponse {
  if (
    !("results" in response && "next" in response && "previous" in response)
  ) {
    throw new Error("No results");
  }
  if (response.results.length > 0) {
    const firstResult = response.results[0];
    if (!("name" in firstResult)) {
      throw new Error("Not characters");
    }
  }
}

async function getData(params: { queryKey: QueryKey }) {
  const [, page] = params.queryKey;
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  const data = await response.json();
  assertIsCharacterResponse(data);
  return data;
}

function App() {
  const [page, setPage] = useState(1);

  const queryKey: QueryKey = ["characters", page];

  const { status, error, data, isPreviousData } = useQuery<
    CharacterResponse,
    Error
  >({
    queryKey,
    queryFn: () => getData({ queryKey }),
  });

  if (status === "loading") {
    return <div>...</div>;
  }
  if (status === "error") {
    return <div>{error!.message}</div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      <div>
        <button
          disabled={isPreviousData || page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span>Page: {page}</span>
        <button
          disabled={isPreviousData || !data.next}
          onClick={() => setPage((old) => old + 1)}
        >
          Next
        </button>
      </div>
      {
        <div>
          {data.results.map((d) => (
            <div key={d.name}>{d.name}</div>
          ))}
        </div>
      }
    </div>
  );
}

export default App;
