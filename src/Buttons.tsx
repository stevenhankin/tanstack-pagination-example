import "./buttons.css";

type PropsPageButtons = {
  hasNext: boolean | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * Previous/Next pagination buttons with current page offset
 */
const PageButtons: React.FC<PropsPageButtons> = ({
  hasNext,
  page,
  setPage,
}) => {
  return (
    <div id="page-buttons">
      <button
        className="page-button"
        disabled={page <= 1}
        onClick={() => setPage((prev) => prev - 1)}
      >
        {"<"}
      </button>

      <span id="page-counter">Page: {page}</span>

      <button
        className="page-button"
        disabled={!hasNext}
        onClick={() => setPage((prev) => prev + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default PageButtons;
