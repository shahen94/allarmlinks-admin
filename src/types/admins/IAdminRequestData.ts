export interface IAdminRequestData {
    name: string;
    surname: string
    email: string;
    password: string;
}

export interface IAdminUpdateData {
    name?: string;
    surname?: string
    email?: string;
    password?: string;
}

export interface IAdminUpdateThunkData {
    _id: string;
    name?: string;
    surname?: string
    email?: string;
    password?: string;
}