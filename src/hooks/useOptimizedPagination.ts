// Optimized pagination hook with minimal re-renders
import { useState, useMemo, useCallback } from 'react';
import { PaginationResult } from '@/types';

export function useOptimizedPagination<T>(
  items: T[],
  initialPageSize: number = 25,
  initialPage: number = 1
) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Memoized pagination calculation
  const paginationResult = useMemo((): PaginationResult<T> => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const safePage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);

    return {
      data: items.slice(startIndex, endIndex),
      currentPage: safePage,
      totalPages,
      totalItems,
      startIndex: startIndex + 1,
      endIndex
    };
  }, [items, currentPage, pageSize]);

  // Optimized navigation functions
  const goToPage = useCallback((page: number) => {
    const newPage = Math.min(Math.max(1, page), paginationResult.totalPages);
    setCurrentPage(newPage);
  }, [paginationResult.totalPages]);

  const nextPage = useCallback(() => {
    if (currentPage < paginationResult.totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, paginationResult.totalPages]);

  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const changePageSize = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Reset pagination when items change significantly
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    ...paginationResult,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    resetPagination,
    canGoPrevious: currentPage > 1,
    canGoNext: currentPage < paginationResult.totalPages
  };
}