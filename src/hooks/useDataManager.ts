// Centralized data management hook with optimized operations
import { useState, useEffect, useMemo, useCallback } from 'react';
import { OptimizedDataStore, MemoizedCache, generateOptimizedStudentData, generateOptimizedUserData, generateOptimizedCourseData } from '@/utils/dataStructures';
import { Student, User, Course, BaseEntity, EntityType, PaginationResult } from '@/types';

type EntityData = Student | User | Course;

export function useDataManager<T extends BaseEntity>(entityType: EntityType) {
  const [dataStore] = useState(() => {
    let initialData: BaseEntity[];
    switch (entityType) {
      case 'students':
        initialData = generateOptimizedStudentData();
        break;
      case 'users':
        initialData = generateOptimizedUserData();
        break;
      case 'courses':
        initialData = generateOptimizedCourseData();
        break;
      default:
        initialData = [];
    }
    return new OptimizedDataStore<T>(initialData as T[]);
  });

  const [searchCache] = useState(() => new MemoizedCache<T[]>(10)); // 10 minute cache
  const [filterCache] = useState(() => new MemoizedCache<T[]>(5)); // 5 minute cache
  
  // O(1) operations
  const getById = useCallback((id: number) => dataStore.getById(id), [dataStore]);
  const getAll = useCallback(() => dataStore.getAll(), [dataStore]);
  const size = useCallback(() => dataStore.size(), [dataStore]);
  
  // Optimized CRUD operations
  const create = useCallback((item: Omit<T, 'id'>) => {
    const newId = dataStore.size() + 1;
    const newItem = { ...item, id: newId } as T;
    dataStore.insert(newItem);
    
    // Invalidate caches
    searchCache.clear();
    filterCache.clear();
    
    return newItem;
  }, [dataStore, searchCache, filterCache]);

  const update = useCallback((id: number, updates: Partial<T>) => {
    const success = dataStore.update(id, updates);
    if (success) {
      searchCache.clear();
      filterCache.clear();
    }
    return success;
  }, [dataStore, searchCache, filterCache]);

  const remove = useCallback((id: number) => {
    const success = dataStore.delete(id);
    if (success) {
      searchCache.clear();
      filterCache.clear();
    }
    return success;
  }, [dataStore, searchCache, filterCache]);

  // Optimized search with caching
  const search = useCallback((query: string, searchFields?: string[]) => {
    if (!query.trim()) return getAll();
    
    const cacheKey = `search_${query}_${searchFields?.join('_') || 'default'}`;
    const cached = searchCache.get(cacheKey);
    if (cached) return cached;
    
    const results = dataStore.search(query, searchFields);
    searchCache.set(cacheKey, results);
    return results;
  }, [dataStore, searchCache, getAll]);

  // Optimized filtering with caching
  const filter = useCallback((predicate: (item: T) => boolean, cacheKey?: string) => {
    if (cacheKey) {
      const cached = filterCache.get(cacheKey);
      if (cached) return cached;
    }
    
    const results = dataStore.filter(predicate);
    
    if (cacheKey) {
      filterCache.set(cacheKey, results);
    }
    
    return results;
  }, [dataStore, filterCache]);

  // Optimized sorting
  const sort = useCallback((items: T[], field: keyof T, order: 'asc' | 'desc' = 'asc') => {
    return dataStore.sort(items, field, order);
  }, [dataStore]);

  // Efficient pagination
  const paginate = useCallback((items: T[], page: number, pageSize: number): PaginationResult<T> => {
    return dataStore.paginate(items, page, pageSize);
  }, [dataStore]);

  // Computed statistics (memoized)
  const stats = useMemo(() => {
    const all = getAll();
    const active = filter(item => item.status === 'Active', 'active_items');
    
    const baseStats = {
      total: all.length,
      active: active.length,
      inactive: all.length - active.length,
    };

    // Entity-specific stats
    if (entityType === 'students') {
      const students = all as any[];
      const ongoing = students.filter(s => s.course?.status === 'Ongoing').length;
      return {
        ...baseStats,
        enrolled: ongoing,
        averageProgress: students.reduce((acc, s) => acc + (s.course?.progress || 0), 0) / students.length || 0
      };
    }

    if (entityType === 'users') {
      const users = all as any[];
      const byRole = users.reduce((acc, user) => {
        const role = user.role;
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      return {
        ...baseStats,
        byRole
      };
    }

    if (entityType === 'courses') {
      const courses = all as any[];
      const totalEnrolled = courses.reduce((acc, c) => acc + (c.enrolledStudents || 0), 0);
      const averageProgress = courses.reduce((acc, c) => acc + (c.averageProgress || 0), 0) / courses.length || 0;
      
      return {
        ...baseStats,
        totalEnrolled,
        averageProgress
      };
    }

    return baseStats;
  }, [getAll, filter, entityType]);

  return {
    // Data operations
    getAll,
    getById,
    create,
    update,
    remove,
    
    // Query operations
    search,
    filter,
    sort,
    paginate,
    
    // Computed values
    stats,
    size,
    
    // Cache management
    clearCache: useCallback(() => {
      searchCache.clear();
      filterCache.clear();
    }, [searchCache, filterCache])
  };
}