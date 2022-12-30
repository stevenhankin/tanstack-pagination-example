import { useState } from "react";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CharacterResponse, getData } from "./api";
import PagedCharacters from "./PagedCharacters";

function App() {
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState<boolean>();

  return (
    <div>
      <div>
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>Page: {page}</span>

        <button disabled={!hasNext} onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>

      <PagedCharacters page={page} setHasNext={setHasNext} />
    </div>
  );
}

export default App;
