
export interface IFormikValues {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface IFormikError {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
}