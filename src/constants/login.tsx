export const LOGIN = {
    TOKEN: (typeof window !== 'undefined') ? localStorage.getItem('TOKEN'): '',
    TYPEUSER: (typeof window !== 'undefined') ? localStorage.getItem('TYPEUSER') : '',
};
