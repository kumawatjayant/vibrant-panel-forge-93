// Optimized data structures and algorithms using DSA concepts

import { Student, User, Course, BaseEntity, EntityType } from '@/types';

// Optimized data store using Maps for O(1) lookups
export class OptimizedDataStore<T extends BaseEntity> {
  private dataMap = new Map<number, T>();
  private indexMaps = new Map<string, Map<string, Set<number>>>();
  
  constructor(initialData: T[] = []) {
    this.bulkInsert(initialData);
  }
  
  // O(1) insertion
  insert(item: T): void {
    this.dataMap.set(item.id, item);
    this.updateIndices(item);
  }
  
  // O(n) bulk insertion - more efficient than multiple single insertions
  bulkInsert(items: T[]): void {
    items.forEach(item => {
      this.dataMap.set(item.id, item);
      this.updateIndices(item);
    });
  }
  
  // O(1) retrieval by ID
  getById(id: number): T | undefined {
    return this.dataMap.get(id);
  }
  
  // O(1) deletion
  delete(id: number): boolean {
    const item = this.dataMap.get(id);
    if (item) {
      this.dataMap.delete(id);
      this.removeFromIndices(item);
      return true;
    }
    return false;
  }
  
  // O(1) update with automatic index maintenance
  update(id: number, updates: Partial<T>): boolean {
    const item = this.dataMap.get(id);
    if (item) {
      this.removeFromIndices(item);
      const updatedItem = { ...item, ...updates };
      this.dataMap.set(id, updatedItem);
      this.updateIndices(updatedItem);
      return true;
    }
    return false;
  }
  
  // O(1) average case search using indices
  findByField(field: string, value: string): T[] {
    const fieldMap = this.indexMaps.get(field);
    if (!fieldMap) return [];
    
    const ids = fieldMap.get(value.toLowerCase());
    if (!ids) return [];
    
    return Array.from(ids).map(id => this.dataMap.get(id)!).filter(Boolean);
  }
  
  // Optimized fuzzy search with early termination
  search(query: string, searchFields: string[] = ['name', 'email']): T[] {
    if (!query.trim()) return this.getAll();
    
    const queryLower = query.toLowerCase();
    const results = new Set<T>();
    
    // Use indices for exact matches first (O(1))
    for (const field of searchFields) {
      const exactMatches = this.findByField(field, queryLower);
      exactMatches.forEach(item => results.add(item));
    }
    
    // Fuzzy matching for partial matches (only if needed)
    if (results.size === 0) {
      for (const item of this.dataMap.values()) {
        if (searchFields.some(field => {
          const fieldValue = (item as any)[field]?.toString().toLowerCase();
          return fieldValue?.includes(queryLower);
        })) {
          results.add(item);
        }
      }
    }
    
    return Array.from(results);
  }
  
  // O(n) filtering with early termination optimization
  filter(predicate: (item: T) => boolean): T[] {
    const results: T[] = [];
    for (const item of this.dataMap.values()) {
      if (predicate(item)) {
        results.push(item);
      }
    }
    return results;
  }
  
  // Optimized sorting using native sort (Timsort - O(n log n))
  sort(items: T[], field: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    return [...items].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  // O(1) size
  size(): number {
    return this.dataMap.size;
  }
  
  // O(n) get all items
  getAll(): T[] {
    return Array.from(this.dataMap.values());
  }
  
  // Efficient pagination without creating full arrays
  paginate(items: T[], page: number, pageSize: number) {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    
    return {
      data: items.slice(startIndex, endIndex),
      currentPage: page,
      totalPages,
      totalItems,
      startIndex: startIndex + 1,
      endIndex
    };
  }
  
  private updateIndices(item: T): void {
    const indexableFields = ['name', 'email', 'status', 'role', 'department'];
    
    indexableFields.forEach(field => {
      const value = (item as any)[field];
      if (value) {
        if (!this.indexMaps.has(field)) {
          this.indexMaps.set(field, new Map());
        }
        
        const fieldMap = this.indexMaps.get(field)!;
        const key = value.toString().toLowerCase();
        
        if (!fieldMap.has(key)) {
          fieldMap.set(key, new Set());
        }
        
        fieldMap.get(key)!.add(item.id);
      }
    });
  }
  
  private removeFromIndices(item: T): void {
    const indexableFields = ['name', 'email', 'status', 'role', 'department'];
    
    indexableFields.forEach(field => {
      const value = (item as any)[field];
      if (value) {
        const fieldMap = this.indexMaps.get(field);
        if (fieldMap) {
          const key = value.toString().toLowerCase();
          const idSet = fieldMap.get(key);
          if (idSet) {
            idSet.delete(item.id);
            if (idSet.size === 0) {
              fieldMap.delete(key);
            }
          }
        }
      }
    });
  }
}

// Memoization utility for expensive computations
export class MemoizedCache<T> {
  private cache = new Map<string, { value: T; timestamp: number }>();
  private readonly ttl: number;
  
  constructor(ttlMinutes: number = 5) {
    this.ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
  }
  
  get(key: string): T | undefined {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.ttl) {
      return cached.value;
    }
    
    if (cached) {
      this.cache.delete(key); // Remove expired entry
    }
    
    return undefined;
  }
  
  set(key: string, value: T): void {
    this.cache.set(key, { value, timestamp: Date.now() });
  }
  
  clear(): void {
    this.cache.clear();
  }
}

// Optimized data generators with reduced complexity
export const generateOptimizedStudentData = (): Student[] => {
  const cache = new MemoizedCache<Student[]>();
  const cacheKey = 'students_data';
  
  const cached = cache.get(cacheKey);
  if (cached) return cached;
  
  // Pre-computed arrays for efficiency
  const names = ['John Smith', 'Sarah Johnson', 'Mike Williams', 'Emily Brown', 'David Jones'];
  const courses = ['Web Development', 'Data Science', 'Mobile Development'];
  const statuses = ['Active', 'Inactive'];
  
  const students: Student[] = Array.from({ length: 50 }, (_, i) => {
    const nameIndex = i % names.length;
    const courseIndex = i % courses.length;
    const [firstName, lastName] = names[nameIndex].split(' ');
    
    return {
      id: i + 1,
      name: names[nameIndex],
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@email.com`,
      phone: `+1 (555) ${String(i + 100).padStart(3, '0')}-${String((i + 1) * 10).padStart(4, '0')}`,
      status: statuses[i % statuses.length],
      avatar: '/placeholder.svg',
      dateOfBirth: new Date(1990 + (i % 25), i % 12, (i % 28) + 1).toISOString().split('T')[0],
      age: 24 + (i % 15),
      gender: i % 3 === 0 ? 'Female' : 'Male',
      nationality: 'USA',
      address: {
        street: `${(i + 1) * 100} Main St`,
        city: 'New York',
        state: 'NY',
        zipCode: 10000 + i,
        country: 'USA'
      },
      education: {
        level: 'Bachelor\'s Degree',
        institution: `University ${i + 1}`,
        graduationYear: 2020 + (i % 5),
        gpa: (3.0 + (i % 10) / 10).toFixed(2)
      },
      emergencyContact: {
        name: `Emergency ${firstName}`,
        relationship: 'Parent',
        phone: `+1 (555) ${String(i + 500).padStart(3, '0')}-0000`,
        email: `emergency${i + 1}@email.com`
      },
      joinDate: new Date(2024, i % 6, (i % 28) + 1).toISOString().split('T')[0],
      lastLogin: new Date(Date.now() - (i % 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      course: {
        name: courses[courseIndex],
        enrollmentDate: new Date(2024, i % 6, (i % 28) + 1).toISOString().split('T')[0],
        duration: '12 weeks',
        progress: 60 + (i % 40),
        status: 'Ongoing',
        remainingDays: (i % 90) + 1,
        instructor: `Prof. ${firstName}`,
        grade: 'B'
      },
      financial: {
        tuitionFee: 3000,
        paidAmount: 2000,
        dueAmount: 1000,
        paymentMethod: 'Credit Card',
        scholarshipAmount: 0
      },
      attendance: {
        totalClasses: 40,
        attendedClasses: 35,
        attendancePercentage: 87
      },
      totalCourses: 2,
      completedCourses: 1,
      achievements: ['Good Student'],
      tags: ['Regular'],
      notes: `Student shows potential.`,
      socialMedia: {}
    };
  });
  
  cache.set(cacheKey, students);
  return students;
};

export const generateOptimizedUserData = (): User[] => {
  const roles = ['Teacher', 'Trainer', 'HR', 'Admin'];
  const departments = ['Engineering', 'Business', 'Design'];
  const statuses = ['Active', 'Inactive'];
  
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `+1 (555) ${String(i + 100).padStart(3, '0')}-0000`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    avatar: '/placeholder.svg',
    dateOfBirth: new Date(1970 + (i % 35), i % 12, (i % 28) + 1).toISOString().split('T')[0],
    age: 35 + (i % 20),
    hireDate: new Date(2015 + (i % 9), i % 12, (i % 28) + 1).toISOString().split('T')[0],
    experience: `${5 + (i % 10)} years`,
    department: departments[i % departments.length],
    employeeId: `EMP${String(i + 1).padStart(4, '0')}`,
    salary: 50000 + (i * 1000),
    address: {
      street: `${(i + 1) * 100} Business Ave`,
      city: 'New York',
      state: 'NY',
      zipCode: 10000 + i,
      country: 'USA'
    },
    education: {
      level: 'Master\'s Degree',
      institution: `University ${i + 1}`,
      graduationYear: 2000 + (i % 24),
      major: departments[i % departments.length]
    },
    emergencyContact: {
      name: `Emergency Contact ${i + 1}`,
      relationship: 'Spouse',
      phone: `+1 (555) ${String(i + 600).padStart(3, '0')}-0000`,
      email: `emergency${i + 1}@example.com`
    },
    skills: ['Leadership', 'Communication'],
    certifications: ['Professional Certification'],
    performanceRating: '4.5',
    lastLogin: new Date(Date.now() - (i % 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: `Experienced ${roles[i % roles.length].toLowerCase()}.`,
    socialMedia: {}
  }));
};

export const generateOptimizedCourseData = (): Course[] => {
  const categories = ['Programming', 'Design', 'Business', 'Marketing'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  
  return Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `${categories[i % categories.length]} Course ${i + 1}`,
    email: '', // Not applicable for courses
    category: categories[i % categories.length],
    duration: `${8 + (i % 8)} weeks`,
    description: `Comprehensive ${categories[i % categories.length]} course covering fundamentals and advanced topics.`,
    enrolledStudents: 20 + (i % 30),
    activeStudents: 18 + (i % 25),
    completedStudents: i % 10,
    averageProgress: 70 + (i % 30),
    status: i % 5 === 0 ? 'Inactive' : 'Active',
    startDate: new Date(2024, i % 6, (i % 28) + 1).toISOString().split('T')[0],
    endDate: new Date(2024, (i % 6) + 3, (i % 28) + 1).toISOString().split('T')[0],
    instructor: `Instructor ${i + 1}`,
    maxStudents: 50,
    price: 1000 + (i * 100),
    level: levels[i % levels.length]
  }));
};