import React, { useState } from 'react';

interface Field {
  name: string;
  label: string;
  type: string;
  validation: (value: any) => string | null;
}

interface DynamicFormProps {
  fields: Field[];
  onSubmit: (values: { [key: string]: any }) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const [values, setValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string | null } = {};
    fields.forEach((field) => {
      const error = field.validation(values[field.name]);
      newErrors[field.name] = error;
    });

    if (Object.values(newErrors).every((err) => err === null)) {
      onSubmit(values);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={values[field.name] || ''}
            onChange={handleChange}
          />
          {errors[field.name] && <span style={{ color: 'red' }}>{errors[field.name]}</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
