// Centralized type definitions for optimal type safety and reusability

export interface BaseEntity {
  id: number;
  name: string;
  email: string;
  status: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Student extends BaseEntity {
  phone: string;
  alternatePhone?: string;
  avatar: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  nationality: string;
  address: Address;
  education: Education;
  emergencyContact: EmergencyContact;
  joinDate: string;
  lastLogin: string;
  course: CourseEnrollment;
  financial: Financial;
  attendance: Attendance;
  totalCourses: number;
  completedCourses: number;
  achievements: string[];
  tags: string[];
  notes: string;
  socialMedia: SocialMedia;
}

export interface User extends BaseEntity {
  phone: string;
  alternatePhone?: string;
  role: string;
  avatar: string;
  dateOfBirth: string;
  age: number;
  hireDate: string;
  experience: string;
  department: string;
  employeeId: string;
  salary: number;
  address: Address;
  education: Education;
  emergencyContact: EmergencyContact;
  skills: string[];
  certifications: string[];
  performanceRating: string;
  lastLogin: string;
  notes: string;
  socialMedia: SocialMedia;
}

export interface Course extends BaseEntity {
  category: string;
  duration: string;
  description: string;
  enrolledStudents: number;
  activeStudents: number;
  completedStudents: number;
  averageProgress: number;
  startDate: string;
  endDate: string;
  instructor: string;
  maxStudents: number;
  price: number;
  level: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
}

export interface Education {
  level: string;
  institution: string;
  graduationYear: number;
  gpa?: string;
  major?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface CourseEnrollment {
  name: string;
  enrollmentDate: string;
  duration: string;
  progress: number;
  status: string;
  remainingDays: number;
  instructor: string;
  grade: string;
}

export interface Financial {
  tuitionFee: number;
  paidAmount: number;
  dueAmount: number;
  paymentMethod: string;
  scholarshipAmount: number;
}

export interface Attendance {
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
}

export interface SocialMedia {
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface SearchFilters {
  [key: string]: string;
}

export interface PaginationResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

export interface StatCard {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  color: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface ActionButton<T> {
  label: string;
  icon: string;
  onClick: (item: T) => void;
  variant?: 'ghost' | 'outline' | 'default';
  className?: string;
}

export type EntityType = 'students' | 'users' | 'courses';
export type SortOrder = 'asc' | 'desc';