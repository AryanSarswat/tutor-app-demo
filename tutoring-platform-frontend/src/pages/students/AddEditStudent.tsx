import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById, createStudent, updateStudent } from '../../services/student/studentService';
import { StudentFormData } from '../../types/student';
import './AddEditStudent.css';

const AddEditStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subjectInput, setSubjectInput] = useState('');
  
  const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm<StudentFormData>();
  
  const subjects = watch('subjects', []);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!isEditMode) return;
      
      try {
        setIsLoading(true);
        const student = await getStudentById(id as string);
        
        // Set form values
        setValue('name', student.name);
        setValue('age', student.age);
        setValue('grade', student.grade);
        setValue('subjects', student.subjects);
        setValue('notes', student.notes);
      } catch (err) {
        setError('Failed to load student data');
        console.error('Error fetching student:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data: StudentFormData) => {
    setIsSaving(true);
    setError(null);
    
    try {
      if (isEditMode) {
        await updateStudent(id as string, data);
      } else {
        await createStudent(data);
      }
      
      navigate('/students');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} student`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} student:`, err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSubject = () => {
    if (!subjectInput.trim()) return;
    
    const newSubject = subjectInput.trim();
    if (!subjects.includes(newSubject)) {
      setValue('subjects', [...subjects, newSubject]);
    }
    setSubjectInput('');
  };

  const handleRemoveSubject = (subject: string) => {
    setValue('subjects', subjects.filter(s => s !== subject));
  };

  if (isLoading) {
    return <div className="student-form-loading">Loading student data...</div>;
  }

  return (
    <div className="student-form-container">
      <div className="student-form-header">
        <h1>{isEditMode ? 'Edit Student' : 'Add New Student'}</h1>
      </div>

      {error && <div className="student-form-error">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="student-form">
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            id="name"
            type="text"
            {...register('name', { 
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              {...register('age', { 
                required: 'Age is required',
                min: {
                  value: 5,
                  message: 'Age must be at least 5'
                },
                max: {
                  value: 25,
                  message: 'Age must be at most 25'
                }
              })}
              className={errors.age ? 'input-error' : ''}
            />
            {errors.age && <span className="error-message">{errors.age.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="grade">Grade/Year</label>
            <input
              id="grade"
              type="text"
              {...register('grade', { 
                required: 'Grade is required'
              })}
              className={errors.grade ? 'input-error' : ''}
            />
            {errors.grade && <span className="error-message">{errors.grade.message}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label>Subjects</label>
          <Controller
            name="subjects"
            control={control}
            defaultValue={[]}
            rules={{ required: 'At least one subject is required' }}
            render={({ field }) => (
              <div className="subjects-input-container">
                <div className="subjects-input-row">
                  <input
                    type="text"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    placeholder="Add a subject"
                    className={errors.subjects ? 'input-error' : ''}
                  />
                  <button 
                    type="button" 
                    onClick={handleAddSubject}
                    className="add-subject-button"
                  >
                    Add
                  </button>
                </div>
                
                {subjects.length > 0 ? (
                  <div className="subjects-list">
                    {subjects.map((subject, index) => (
                      <div key={index} className="subject-tag">
                        {subject}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveSubject(subject)}
                          className="remove-subject-button"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-subjects-message">No subjects added yet</div>
                )}
              </div>
            )}
          />
          {errors.subjects && <span className="error-message">{errors.subjects.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            {...register('notes')}
            rows={5}
            placeholder="Add any notes about the student"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/students')}
            className="cancel-button"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="save-button" 
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : (isEditMode ? 'Update Student' : 'Add Student')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditStudent;
