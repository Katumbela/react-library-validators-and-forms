# react-library-validators-and-forms 
 

# Samples Lib - React

A versatile React component library for dynamic forms and animations.

## Features

- **DynamicForm**: A flexible form component that generates fields based on a configuration and handles validation.
- **FadeIn**: An animation component for smoothly fading in content.
- **SlideUp**: An animation component for sliding content up from an initial offset.

## Installation

You can install the library via npm:

```bash
npm install samples-lib-react
```

Or using yarn:

```bash
yarn add samples-lib-react
```

## Usage

### DynamicForm

The `DynamicForm` component allows you to create a form dynamically based on a configuration.

**Props:**

- `fields`: An array of field configurations. Each field must have `name`, `label`, `type`, and `validation` properties.
- `onSubmit`: A function that receives the form values when the form is submitted.

**Example Usage:**

```typescript
import React from 'react';
import DynamicForm from 'samples-lib-react';

const App: React.FC = () => {
  const handleSubmit = (values: { [key: string]: any }) => {
    console.log('Form values:', values);
  };

  
  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: (value: string) => value.includes('@') ? null : 'Invalid email',
      className: 'input-email', // Adicionando classe CSS para estilização
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validation: (value: string) => value.length >= 6 ? null : 'Password too short',
      className: 'input-password', // Adicionando classe CSS para estilização
    },
  ];


  return <DynamicForm fields={fields} onSubmit={handleSubmit} />;
};
```

### FadeIn

The `FadeIn` component animates its children by fading them in.

**Props:**

- `children`: The content to animate.
- `duration`: The duration of the animation in milliseconds (default: 500).
- `delay`: The delay before the animation starts in milliseconds (default: 0).

**Example Usage:**

```typescript
import React from 'react';
import FadeIn from 'samples-lib-react/components/Animations/FadeIn';

const App: React.FC = () => {
  return (
    <FadeIn duration={1000} delay={500}>
      <h1>Hello, World!</h1>
    </FadeIn>
  );
};
```

### SlideUp

The `SlideUp` component animates its children by sliding them up from an initial offset.

**Props:**

- `children`: The content to animate.
- `duration`: The duration of the animation in milliseconds (default: 500).
- `delay`: The delay before the animation starts in milliseconds (default: 0).
- `initialOffset`: The initial offset for the animation (default: '100%').

**Example Usage:**

```typescript
import React from 'react';
import SlideUp from 'samples-lib-react/components/Animations/SlideUp';

const App: React.FC = () => {
  return (
    <SlideUp duration={1000} delay={500} initialOffset="50%">
      <h1>Welcome to the SlideUp Animation</h1>
    </SlideUp>
  );
};
```

## API

### DynamicForm

**`<DynamicForm />`**

- **fields**: `{ name: string, label: string, type: string, validation: (value: any) => string | null }[]`
- **onSubmit**: `(values: { [key: string]: any }) => void`

### FadeIn

**`<FadeIn />`**

- **children**: `React.ReactNode`
- **duration**: `number` (default: 500)
- **delay**: `number` (default: 0)

### SlideUp

**`<SlideUp />`**

- **children**: `React.ReactNode`
- **duration**: `number` (default: 500)
- **delay**: `number` (default: 0)
- **initialOffset**: `string` (default: '100%')







### Validators

**Validation Functions**

The library provides several utility functions for validation and formatting:

- `validateEmail(email: string): string | null`
- `validateRequired(value: any): string | null`
- `validatePassword(password: string): string | null`
- `validateUsername(username: string): string | null`
- `validateDate(date: string): string | null`
- `validatePhoneNumber(phoneNumber: string): string | null`
- `validateAndFormatPhoneNumber(number: string, countryCode: CountryCode): { valid: boolean, formatted: string | null, error: string | null }`
- `validateAngolanBI(bi: string): string | null`

**Example Usage:**

```typescript
import { validateEmail, validatePassword, validateAndFormatPhoneNumber, validateAngolanBI } from 'samples-lib-react/utils/validators';

const emailError = validateEmail('test@example.com');
const passwordError = validatePassword('Passw0rd!');
const phoneValidation = validateAndFormatPhoneNumber('+1234567890', 'US');
const biError = validateAngolanBI('123456789BA001');

console.log(emailError); // null if valid, or an error message
console.log(passwordError); // null if valid, or an error message
console.log(phoneValidation); // { valid: true, formatted: '+1 234 567-890', error: null }
console.log(biError); // null if valid, or an error message
```

## API

### DynamicForm

**`<DynamicForm />`**

- **fields**: `{ name: string, label: string, type: string, validation: (value: any) => string | null }[]`
- **onSubmit**: `(values: { [key: string]: any }) => void`

### Animations

**`<FadeIn />`**

- **children**: `React.ReactNode`
- **duration**: `number` (default: 500)
- **delay**: `number` (default: 0)

**`<SlideUp />`**

- **children**: `React.ReactNode`
- **duration**: `number` (default: 500)
- **delay**: `number` (default: 0)
- **initialOffset**: `string` (default: '100%')

### Validators

**`validateEmail(email: string): string | null`**

Validates an email address.

**`validateRequired(value: any): string | null`**

Checks if a field is required and not empty.

**`validatePassword(password: string): string | null`**

Validates a password based on length, character types, and special characters.

**`validateUsername(username: string): string | null`**

Validates a username based on allowed characters and length.

**`validateDate(date: string): string | null`**

Validates a date in the format YYYY-MM-DD.

**`validatePhoneNumber(phoneNumber: string): string | null`**

Validates a phone number in E.164 format.

**`validateAndFormatPhoneNumber(number: string, countryCode: CountryCode): { valid: boolean, formatted: string | null, error: string | null }`**

Validates and formats phone numbers for supported country codes.

**`validateAngolanBI(bi: string): string | null`**

Validates an Angolan ID card number.

## Contributing

We welcome contributions to improve the library. To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and test thoroughly.
4. Submit a pull request with a detailed description of your changes.

For more detailed contributing guidelines, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## Testing

To run tests, use:

```bash
npm test
```

Or:

```bash
yarn test
```

Ensure that all tests pass before submitting changes.

## License

This library is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please reach out to [joaokatumbela82@gmail.com](mailto:joaokatumbela82@gmail.com) or open an issue on the [GitHub repository](https://github.com/Katumbela).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the latest updates and version changes.

---


## Contributing

We welcome contributions to improve the library. To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and test thoroughly.
4. Submit a pull request with a detailed description of your changes.

For more detailed contributing guidelines, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## Testing

To run tests, use:

```bash
npm test
```

Or:

```bash
yarn test
```

Ensure that all tests pass before submitting changes.

## License

This library is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please reach out to [joaokatumbela82@gmail.com](mailto:joaokatumbela82@gmail.com) or open an issue on the [GitHub repository](https://github.com/Katumbela).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the latest updates and version changes.

---

Esse README fornece uma visão geral completa e útil para qualquer usuário desta biblioteca.  

 