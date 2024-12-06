import React, { useState } from "react";

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const getVisiblePages = () => {
        const maxVisible = 3;
        const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const endPage = Math.min(totalPages, startPage + maxVisible - 1);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex justify-start items-center mt-4 space-x-2">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md text-white ${currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
            >
                Prev
            </button>

            {/* Page Numbers */}
            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-md ${page === currentPage
                            ? "bg-green-700 text-white"
                            : "bg-white text-green-700 border transition-all hover:bg-green-600 hover:text-white"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md text-white ${currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
            >
                Next
            </button>
        </div>
    );
};