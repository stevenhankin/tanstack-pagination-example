import { QueryKey } from "@tanstack/react-query";

export type CharacterResponse = {
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

export async function getData(params: { queryKey: QueryKey }) {
  const [, page] = params.queryKey;
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  const data = await response.json();
  assertIsCharacterResponse(data);
  return data;
}
