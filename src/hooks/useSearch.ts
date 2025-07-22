// Optimized search hook with debouncing and memoization
import { useState, useMemo, useCallback, useEffect } from 'react';
import { SearchFilters } from '@/types';

export function useOptimizedSearch<T>(
  items: T[],
  searchFields: string[],
  debounceMs: number = 300
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Memoized search results
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim() && Object.keys(filters).length === 0) {
      return items;
    }

    return items.filter(item => {
      // Apply text search
      const matchesSearch = !debouncedSearchTerm.trim() || searchFields.some(field => {
        const fieldValue = (item as any)[field]?.toString().toLowerCase() || '';
        return fieldValue.includes(debouncedSearchTerm.toLowerCase());
      });

      // Apply filters
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const fieldValue = (item as any)[key]?.toString().toLowerCase() || '';
        return fieldValue.includes(value.toLowerCase());
      });

      return matchesSearch && matchesFilters;
    });
  }, [items, debouncedSearchTerm, filters, searchFields]);

  // Optimized filter functions
  const setFilter = useCallback((key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const removeFilter = useCallback((key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
  }, []);

  // Batch filter update for multiple filters at once
  const setMultipleFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    filters,
    setFilter,
    removeFilter,
    clearAllFilters,
    setMultipleFilters,
    searchResults,
    isSearching: searchTerm !== debouncedSearchTerm,
    hasActiveFilters: debouncedSearchTerm.trim() !== '' || Object.keys(filters).length > 0
  };
}

// Specialized search hook for advanced forms
export function useAdvancedSearch<T>(items: T[], searchConfig: Record<string, string[]>) {
  const [searchParams, setSearchParams] = useState<SearchFilters>({});

  const searchResults = useMemo(() => {
    const activeParams = Object.entries(searchParams).filter(([_, value]) => value.trim() !== '');
    
    if (activeParams.length === 0) return items;

    return items.filter(item => {
      return activeParams.every(([key, value]) => {
        const searchFields = searchConfig[key] || [key];
        return searchFields.some(field => {
          const fieldValue = (item as any)[field]?.toString().toLowerCase() || '';
          return fieldValue.includes(value.toLowerCase());
        });
      });
    });
  }, [items, searchParams, searchConfig]);

  const updateSearchParam = useCallback((key: string, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetSearch = useCallback(() => {
    setSearchParams({});
  }, []);

  return {
    searchParams,
    updateSearchParam,
    resetSearch,
    searchResults,
    hasActiveSearch: Object.values(searchParams).some(value => value.trim() !== '')
  };
}