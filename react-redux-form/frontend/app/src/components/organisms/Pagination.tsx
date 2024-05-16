import React from 'react';

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePaginationClick = (page: number) => {
    onPageChange(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePaginationClick(i)}
          className={`border border-black px-2 mx-0.5  ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="text-center">
      {currentPage !== 1 && (
        <button
          className="border border-black px-1.5 mr-0.5"
          onClick={() => handlePaginationClick(currentPage - 1)}
        >
          ◀
        </button>
      )}
      {renderPaginationButtons()}
      {currentPage !== totalPages && (
        <button
          className="border border-black px-1.5 ml-0.5"
          onClick={() => handlePaginationClick(currentPage + 1)}
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default Pagination;
