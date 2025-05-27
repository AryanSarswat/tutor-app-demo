import { Student } from '../../types/student';

// Mock student data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 15,
    grade: '10th',
    subjects: ['Math', 'Physics'],
    notes: 'Struggles with algebra concepts but excels at geometry.',
    isArchived: false
  },
  {
    id: '2',
    name: 'Emma Johnson',
    age: 12,
    grade: '7th',
    subjects: ['English', 'History'],
    notes: 'Strong writing skills, needs help with essay structure.',
    isArchived: false
  },
  {
    id: '3',
    name: 'Michael Brown',
    age: 17,
    grade: '12th',
    subjects: ['Chemistry', 'Biology'],
    notes: 'Preparing for college applications, focusing on science subjects.',
    isArchived: false
  },
  {
    id: '4',
    name: 'Sophia Davis',
    age: 14,
    grade: '9th',
    subjects: ['Math', 'Computer Science'],
    notes: 'Very interested in programming, shows aptitude for logical thinking.',
    isArchived: true
  }
];

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Student service functions
export const getStudents = async (includeArchived: boolean = false): Promise<Student[]> => {
  // Simulate API call
  await delay(800);
  
  // Filter archived students if needed
  return mockStudents.filter(student => includeArchived || !student.isArchived);
};

export const getStudentById = async (id: string): Promise<Student> => {
  // Simulate API call
  await delay(600);
  
  const student = mockStudents.find(s => s.id === id);
  
  if (!student) {
    throw new Error('Student not found');
  }
  
  return student;
};

export const createStudent = async (studentData: Omit<Student, 'id' | 'isArchived'>): Promise<Student> => {
  // Simulate API call
  await delay(1000);
  
  // Create new student with generated ID
  const newStudent: Student = {
    ...studentData,
    id: (mockStudents.length + 1).toString(),
    isArchived: false
  };
  
  // In a real app, this would add the student to the database
  mockStudents.push(newStudent);
  
  return newStudent;
};

export const updateStudent = async (id: string, studentData: Partial<Student>): Promise<Student> => {
  // Simulate API call
  await delay(1000);
  
  const studentIndex = mockStudents.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    throw new Error('Student not found');
  }
  
  // Update student data
  const updatedStudent = {
    ...mockStudents[studentIndex],
    ...studentData
  };
  
  // In a real app, this would update the student in the database
  mockStudents[studentIndex] = updatedStudent;
  
  return updatedStudent;
};

export const archiveStudent = async (id: string): Promise<void> => {
  // Simulate API call
  await delay(800);
  
  const studentIndex = mockStudents.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    throw new Error('Student not found');
  }
  
  // Set isArchived to true
  mockStudents[studentIndex].isArchived = true;
};

export const unarchiveStudent = async (id: string): Promise<void> => {
  // Simulate API call
  await delay(800);
  
  const studentIndex = mockStudents.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    throw new Error('Student not found');
  }
  
  // Set isArchived to false
  mockStudents[studentIndex].isArchived = false;
};
