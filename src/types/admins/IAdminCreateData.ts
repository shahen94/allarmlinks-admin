export interface IAdminCreateData {
    name: string;
    surname: string
    email: string;
    password: string;
}

export interface IAdminUpdateData extends IAdminCreateData {
    _id: string;
}