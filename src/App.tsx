import { useState } from "react";
import PagedCharacters from "./PagedCharacters";
import PageButtons from "./Buttons";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState<boolean>();

  return (
    <div>
      <PageButtons hasNext={hasNext} page={page} setPage={setPage} />
      <PagedCharacters page={page} setHasNext={setHasNext} />
    </div>
  );
}

export default App;
