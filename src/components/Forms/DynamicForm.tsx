
import React, { useState } from 'react';

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validation?: (value: any) => string | null; // Função de validação personalizada
}

interface DynamicFormProps {
  fields: Field[];
  onSubmit: (values: { [key: string]: any }) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    const field = fields.find((field) => field.name === name);
    if (field && field.validation) {
      setErrors({ ...errors, [name]: field.validation(value) });
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrors: { [key: string]: string | null } = {};

    fields.forEach((field) => {
      if (field.validation) {
        const error = field.validation(formValues[field.name]);
        if (error) {
          isValid = false;
          newErrors[field.name] = error;
        }
      }
    });

    setErrors(newErrors);

    if (isValid) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formValues[field.name] || ''}
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
