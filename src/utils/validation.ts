

type CountryCode = 'US' | 'GB' | 'FR' | 'DE' | 'IT' | 'ES' | 'PT' | 'BR' | 'AR' | 'CL' | 'CO' | 'MX' | 'NG' | 'ZA' | 'AO';

const supportedCountries: CountryCode[] = [
    'US', 'GB', 'FR', 'DE', 'IT', 'ES', 'PT', 'BR', 'AR', 'CL', 'CO', 'MX', 'NG', 'ZA', 'AO'
];

const validProvinces = [
    'BE', 'BA', 'BG', 'BI', 'CA', 'CN', 'CS', 'CU', 'HB', 'HL', 'LD', 'LN', 'LS', 'MA', 'MX', 'NB', 'UG', 'ZA'
];


// Validação de Email
export const validateEmail = (email: string): string | null => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) ? null : 'Invalid email address';
};

// Validação de Campo Obrigatório
export const validateRequired = (value: any): string | null => {
    return value !== null && value !== undefined && value !== '' ? null : 'This field is required';
};

// Validação de Senha
export const validatePassword = (password: string): string | null => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/\d/.test(password)) return 'Password must contain at least one number';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[@$!%*?&#]/.test(password)) return 'Password must contain at least one special character';
    return null;
};

// Validação de Nome de Usuário
export const validateUsername = (username: string): string | null => {
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    return re.test(username) ? null : 'Username must be 3-20 characters long and contain only letters, numbers, and underscores';
};

// Validação de Data
export function validateDate(date: string): string | null {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
        return 'Invalid date format (YYYY-MM-DD)';
    }

    const [year, month, day] = date.split('-').map(Number);

    // Verificar se a data é válida
    const isValidDate = (d: Date) => d.getFullYear() === year && d.getMonth() + 1 === month && d.getDate() === day;
    const dateObj = new Date(year, month - 1, day);

    return isValidDate(dateObj) ? null : 'Invalid date format (YYYY-MM-DD)';
}

// Validação de Número de Telefone
export const validatePhoneNumber = (phoneNumber: string): string | null => {
    const re = /^\+?[1-9]\d{1,14}$/; // Formato E.164
    return re.test(phoneNumber) ? null : 'Invalid phone number';
};


// Validação e Formatação para EUA
export const validateAndFormatUS = (phoneNumber: string): { valid: boolean; formatted: string | null; error: string | null } => {
    const re = /^\+1\d{10}$/; // Exemplo de formato: +1xxxxxxxxxx
    const formatted = phoneNumber.replace(/\D/g, '');
    return re.test(formatted) ? { valid: true, formatted: `+1 ${formatted.slice(1, 4)} ${formatted.slice(4, 7)}-${formatted.slice(7)}`, error: null } : { valid: false, formatted: null, error: 'Invalid phone number' };
};

// Validação e Formatação para Reino Unido
export const validateAndFormatGB = (phoneNumber: string): { valid: boolean; formatted: string | null; error: string | null } => {
    const re = /^\+44\d{10}$/; // Exemplo de formato: +44xxxxxxxxxx
    const formatted = phoneNumber.replace(/\D/g, '');
    return re.test(formatted) ? { valid: true, formatted: `+44 ${formatted.slice(2, 5)} ${formatted.slice(5, 8)} ${formatted.slice(8)}`, error: null } : { valid: false, formatted: null, error: 'Invalid phone number' };
};

// Validação e Formatação para Angola
export const validateAndFormatAO = (phoneNumber: string): { valid: boolean; formatted: string | null; error: string | null } => {
    const re = /^\+244\d{9}$/; // Exemplo de formato: +244xxxxxxxxx
    const formatted = phoneNumber.replace(/\D/g, '');
    return re.test(formatted) ? { valid: true, formatted: `+244 ${formatted.slice(4, 7)} ${formatted.slice(7)}`, error: null } : { valid: false, formatted: null, error: 'Invalid phone number' };
};

// Função genérica para validar e formatar números de telefone 
export function validateAndFormatPhoneNumber(number: string, countryCode: CountryCode): { valid: boolean, formatted: string | null, error: string | null } {
    const formats: { [key in CountryCode]?: RegExp } = {
        US: /^\+1\d{10}$/,
        GB: /^\+44\d{10}$/,
        AO: /^\+244\d{9}$/
    };

    const format = formats[countryCode];
    if (!format) {
        return { valid: false, formatted: null, error: 'Unsupported country code' };
    }

    // Remove todos os caracteres não numéricos do número fornecido, mantendo o sinal de '+'
    const cleanedNumber = number.replace(/[^\d+]/g, '');

    // Verifique se o número limpo corresponde ao formato esperado
    const isValid = format.test(cleanedNumber);

    if (!isValid) {
        return { valid: false, formatted: null, error: 'Invalid phone number' };
    }

    let formattedNumber: string | null = null;
    switch (countryCode) {
        case 'US':
            formattedNumber = cleanedNumber.replace(/^(\+1)(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3 $4');
            break;
        case 'GB':
            formattedNumber = cleanedNumber.replace(/^(\+44)(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3 $4');
            break;
        case 'AO':
            formattedNumber = cleanedNumber.replace(/^(\+244)(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4');
            break;
    }

    return { valid: true, formatted: formattedNumber, error: null };
}






// Validação de Bilhete de Identidade
export function validateAngolanBI(bi: string): string | null {
    if (bi.length !== 14) {
        return 'Invalid ID card length';
    }

    const numericPart = bi.slice(0, 9);
    if (!/^\d{9}$/.test(numericPart)) {
        return 'Invalid numeric part';
    }

    const provinceCode = bi.slice(9, 11);
    const validProvinceCodes = ['BA', 'LU', 'MO', 'ZA']; // Ajuste com códigos de províncias válidos
    if (!validProvinceCodes.includes(provinceCode)) {
        return 'Invalid province code';
    }

    const checkDigits = bi.slice(11);
    if (!/^\d{3}$/.test(checkDigits)) {
        return 'Invalid check digits';
    }

    return null;
}

