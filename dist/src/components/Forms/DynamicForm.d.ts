import React from 'react';
interface Field {
    name: string;
    label: string;
    type: string;
    validation: (value: any) => string | null;
    className?: string;
}
interface DynamicFormProps {
    fields: Field[];
    onSubmit: (values: {
        [key: string]: any;
    }) => void;
}
declare const DynamicForm: React.FC<DynamicFormProps>;
export default DynamicForm;
