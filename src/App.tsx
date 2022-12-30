import { useState } from "react";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CharacterResponse, getData } from "./api";

function App() {
  const [page, setPage] = useState(1);

  const queryKey: QueryKey = ["characters", page];

  const { status, error, data, isPreviousData } = useQuery<
    CharacterResponse,
    AxiosError
  >({
    queryKey,
    queryFn: () => getData({ queryKey }),
  });

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
          disabled={isPreviousData || !data || !data.next}
          onClick={() => setPage((old) => old + 1)}
        >
          Next
        </button>
      </div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : data ? (
        status === "error" ? (
          <div>{error!.message}</div>
        ) : (
          <div>
            {data.results.map((d) => (
              <div key={d.name}>{d.name}</div>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}

export default App;
