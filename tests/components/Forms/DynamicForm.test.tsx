// tests/components/DynamicForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DynamicForm from '../../../src/components/Forms/DynamicForm'; 

// Mock validation functions
const requiredValidation = (value: any) => (value ? null : 'This field is required');

const fields = [
  { name: 'username', label: 'Username', type: 'text', validation: requiredValidation },
  { name: 'email', label: 'Email', type: 'email', validation: requiredValidation },
  { name: 'password', label: 'Password', type: 'password', validation: requiredValidation }
];

describe('DynamicForm Component', () => {
  test('renders form fields correctly', () => {
    render(<DynamicForm fields={fields} onSubmit={() => {}} />);

    fields.forEach((field) => {
      expect(screen.getByLabelText(field.label)).toBeInTheDocument();
    });
  });

  test('shows validation errors when fields are left empty', () => {
    render(<DynamicForm fields={fields} onSubmit={() => {}} />);

    fireEvent.click(screen.getByText('Submit'));

    fields.forEach((field) => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  test('shows no validation errors when fields are filled', () => {
    render(<DynamicForm fields={fields} onSubmit={() => {}} />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Submit'));

    fields.forEach((field) => {
      expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
    });
  });

  test('calls onSubmit with form values on valid submit', () => {
    const mockOnSubmit = jest.fn();

    render(<DynamicForm fields={fields} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Submit'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
