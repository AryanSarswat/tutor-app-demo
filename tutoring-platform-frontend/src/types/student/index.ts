export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  subjects: string[];
  notes: string;
  isArchived: boolean;
}

export interface StudentFormData {
  name: string;
  age: number;
  grade: string;
  subjects: string[];
  notes: string;
}
