"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const DynamicForm = ({ fields, onSubmit }) => {
    const [values, setValues] = (0, react_1.useState)({});
    const [errors, setErrors] = (0, react_1.useState)({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        fields.forEach((field) => {
            const error = field.validation(values[field.name]);
            newErrors[field.name] = error;
        });
        if (Object.values(newErrors).every((err) => err === null)) {
            onSubmit(values);
        }
        else {
            setErrors(newErrors);
        }
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit },
        fields.map((field) => (react_1.default.createElement("div", { key: field.name },
            react_1.default.createElement("label", { htmlFor: field.name }, field.label),
            react_1.default.createElement("input", { id: field.name, name: field.name, type: field.type, value: values[field.name] || '', onChange: handleChange, className: field.className }),
            errors[field.name] && react_1.default.createElement("span", { style: { color: 'red' } }, errors[field.name])))),
        react_1.default.createElement("button", { type: "submit" }, "Submit")));
};
exports.default = DynamicForm;
