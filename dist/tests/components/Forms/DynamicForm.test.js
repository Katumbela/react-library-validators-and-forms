"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
require("@testing-library/jest-dom");
const DynamicForm_1 = __importDefault(require("../../../src/components/Forms/DynamicForm"));
// Função de validação mock
const requiredValidation = (value) => (value ? null : 'This field is required');
// Definição dos campos do formulário
const fields = [
    { name: 'username', label: 'Username', type: 'text', validation: requiredValidation },
    { name: 'email', label: 'Email', type: 'email', validation: requiredValidation },
    { name: 'password', label: 'Password', type: 'password', validation: requiredValidation }
];
describe('DynamicForm Component', () => {
    test('renders form fields correctly', () => {
        (0, react_2.render)(react_1.default.createElement(DynamicForm_1.default, { fields: fields, onSubmit: () => { } }));
        fields.forEach((field) => {
            expect(react_2.screen.getByLabelText(field.label)).toBeInTheDocument();
        });
    });
    test('shows validation errors when fields are left empty', () => {
        (0, react_2.render)(react_1.default.createElement(DynamicForm_1.default, { fields: fields, onSubmit: () => { } }));
        react_2.fireEvent.click(react_2.screen.getByText('Submit'));
        fields.forEach((field) => {
            // Usando queryAllByText para contar o número de mensagens de erro
            const errorMessages = react_2.screen.queryAllByText('This field is required');
            expect(errorMessages).toHaveLength(fields.length);
        });
    });
    test('shows no validation errors when fields are filled', () => {
        (0, react_2.render)(react_1.default.createElement(DynamicForm_1.default, { fields: fields, onSubmit: () => { } }));
        react_2.fireEvent.change(react_2.screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        react_2.fireEvent.change(react_2.screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        react_2.fireEvent.change(react_2.screen.getByLabelText('Password'), { target: { value: 'password123' } });
        react_2.fireEvent.click(react_2.screen.getByText('Submit'));
        // Verifica que nenhuma mensagem de erro está presente
        fields.forEach((field) => {
            expect(react_2.screen.queryByText('This field is required')).not.toBeInTheDocument();
        });
    });
    test('calls onSubmit with form values on valid submit', () => {
        const mockOnSubmit = jest.fn();
        (0, react_2.render)(react_1.default.createElement(DynamicForm_1.default, { fields: fields, onSubmit: mockOnSubmit }));
        react_2.fireEvent.change(react_2.screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        react_2.fireEvent.change(react_2.screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        react_2.fireEvent.change(react_2.screen.getByLabelText('Password'), { target: { value: 'password123' } });
        react_2.fireEvent.click(react_2.screen.getByText('Submit'));
        expect(mockOnSubmit).toHaveBeenCalledWith({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
    });
});
