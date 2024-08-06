type CountryCode = 'US' | 'GB' | 'FR' | 'DE' | 'IT' | 'ES' | 'PT' | 'BR' | 'AR' | 'CL' | 'CO' | 'MX' | 'NG' | 'ZA' | 'AO';
export declare const validateEmail: (email: string) => string | null;
export declare const validateRequired: (value: any) => string | null;
export declare const validatePassword: (password: string) => string | null;
export declare const validateUsername: (username: string) => string | null;
export declare function validateDate(date: string): string | null;
export declare const validatePhoneNumber: (phoneNumber: string) => string | null;
export declare const validateAndFormatUS: (phoneNumber: string) => {
    valid: boolean;
    formatted: string | null;
    error: string | null;
};
export declare const validateAndFormatGB: (phoneNumber: string) => {
    valid: boolean;
    formatted: string | null;
    error: string | null;
};
export declare const validateAndFormatAO: (phoneNumber: string) => {
    valid: boolean;
    formatted: string | null;
    error: string | null;
};
export declare function validateAndFormatPhoneNumber(number: string, countryCode: CountryCode): {
    valid: boolean;
    formatted: string | null;
    error: string | null;
};
export declare function validateAngolanBI(bi: string): string | null;
export {};
