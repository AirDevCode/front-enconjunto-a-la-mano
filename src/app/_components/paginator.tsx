export default function Paginator({loadPage, paginatorData, currentPage}:any) {
  const totalPages = paginatorData.last_page;
  const itemsPerPage = 10;

  const calculateStartPage = () => {
    const currentGroup = Math.ceil(currentPage / itemsPerPage);
    return (currentGroup - 1) * itemsPerPage + 1;
  };

  const calculateEndPage = () => {
    const startPage = calculateStartPage();
    return Math.min(startPage + itemsPerPage - 1, totalPages);
  };

  return (
    <div className="paginator mt-lg-4">
      <button className="btn btn-nav nav-prev" onClick={() => loadPage(currentPage - 1)} disabled={currentPage === 1 || !paginatorData.prev_page_url}>
        <i className="fa-solid fa-angle-left"></i>
      </button>

      {Array.from({ length: calculateEndPage() - calculateStartPage() + 1 }, (_, index) => index + calculateStartPage()).map(
        (page) => (
          <button key={page} onClick={() => loadPage(page)} className={`btn btn-number ${page === currentPage ? 'current' : ''}`}>
            {page}
          </button>
        )
      )}

      <button className="btn btn-nav nav-next" onClick={() => loadPage(currentPage + 1)} disabled={currentPage === paginatorData.last_page || !paginatorData.next_page_url}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
}