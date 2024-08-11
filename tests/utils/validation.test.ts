import {
    validateEmail,
    validateRequired,
    validatePassword,
    validateUsername,
    validateDate,
    validateAndFormatPhoneNumber,
    validateAngolanBI
} from '../../src/utils/validation';

describe('Validation Utilities', () => {

    test('validateEmail should return error for invalid email', () => {
        expect(validateEmail('invalid-email')).toBe('Invalid email address');
    });

    test('validateEmail should return null for valid email', () => {
        expect(validateEmail('test@example.com')).toBeNull();
    });

    test('validateRequired should return error for empty value', () => {
        expect(validateRequired('')).toBe('This field is required');
    });

    test('validateRequired should return null for non-empty value', () => {
        expect(validateRequired('value')).toBeNull();
    });

    test('validatePassword should return error for weak password', () => {
        expect(validatePassword('123')).toBe('Password must be at least 8 characters long');
    });

    test('validatePassword should return null for strong password', () => {
        expect(validatePassword('Str0ng@Pass')).toBeNull();
    });

    test('validateUsername should return error for invalid username', () => {
        expect(validateUsername('ab')).toBe('Username must be 3-20 characters long and contain only letters, numbers, and underscores');
    });

    test('validateUsername should return null for valid username', () => {
        expect(validateUsername('valid_username')).toBeNull();
    });

    test('validateDate should return error for invalid date format', () => {
        expect(validateDate('2020-13-01')).toBe('Invalid date format (YYYY-MM-DD)');
    });

    test('validateDate should return null for valid date format', () => {
        expect(validateDate('2020-12-01')).toBeNull();
    });
    test('validateAndFormatPhoneNumber should return error for invalid phone number (US)', () => {
        expect(validateAndFormatPhoneNumber('12345', 'US')).toEqual({
            valid: false,
            formatted: null,
            error: 'Invalid phone number'
        });
    });

    test('validateAndFormatPhoneNumber should return formatted number for valid phone number (US)', () => {
        expect(validateAndFormatPhoneNumber('+11234567890', 'US')).toEqual({
            valid: true,
            formatted: '+1 1234 567 890',
            error: null
        });
    });

    test('validateAndFormatPhoneNumber should return error for invalid phone number (GB)', () => {
        expect(validateAndFormatPhoneNumber('01632960961', 'GB')).toEqual({
            valid: false,
            formatted: null,
            error: 'Invalid phone number'
        });
    });

    test('validateAndFormatPhoneNumber should return formatted number for valid phone number (GB)', () => {
        expect(validateAndFormatPhoneNumber('+441632960961', 'GB')).toEqual({
            valid: true,
            formatted: '+44 1632 960 961',
            error: null
        });
    });

    test('validateAndFormatPhoneNumber should return error for invalid phone number (AO)', () => {
        expect(validateAndFormatPhoneNumber('+24491234567', 'AO')).toEqual({
            valid: false,
            formatted: null,
            error: 'Invalid phone number'
        });
    });

    test('validateAndFormatPhoneNumber should return formatted number for valid phone number (AO)', () => {
        expect(validateAndFormatPhoneNumber('+244912345678', 'AO')).toEqual({
            valid: true,
            formatted: '+244 912 345 678',
            error: null
        });
    });
    test('should return error for incorrect length', async () => {
        // Teste para BI com comprimento inválido
        await expect(validateAngolanBI('006235348BA04')).resolves.toBe('Invalid ID card length'); // 12 caracteres
        await expect(validateAngolanBI('006235348BA0456')).resolves.toBe('Invalid ID card length'); // 16 caracteres
    });

    test('should return error for invalid numeric part', async () => {
        // Teste para BI onde a parte numérica não é válida
        await expect(validateAngolanBI('00623X348BA045')).resolves.toBe('Invalid numeric part'); // 'X' em vez de dígito
        await expect(validateAngolanBI('00623X348BA0A5')).resolves.toBe('Invalid numeric part'); // 'X' e 'A' em vez de dígitos
    });

    test('should return error for invalid province code', async () => {
        // Teste para BI com código de província inválido
        await expect(validateAngolanBI('006235348XY045')).resolves.toBe('Invalid province code'); // 'XY' não é válido
        await expect(validateAngolanBI('006235348ZZ045')).resolves.toBe('Invalid province code'); // 'ZZ' não é válido
    });

    test('should return error for invalid check digits', async () => {
        // Teste para BI onde os dígitos de verificação não são válidos
        await expect(validateAngolanBI('006235348ZA0XX')).resolves.toBe('Invalid check digits'); // 'XX' não é válido
        await expect(validateAngolanBI('006235348ZA0X1')).resolves.toBe('Invalid check digits'); // 'X1' não é válido
        await expect(validateAngolanBI('006235348ZA0456')).resolves.toBe('Invalid ID card length'); // 4 dígitos no final
    });

    test('should return null for valid ID card', async () => {
        // Teste para um BI válido
        await expect(validateAngolanBI('006235348BA044')).resolves.toBeNull();
    });

    test('should return error for invalid ID from external API', async () => {
        // Teste para um BI que não existe na API externa
        await expect(validateAngolanBI('000000000ZZ045')).resolves.toBe('Invalid province code');
    });

});
