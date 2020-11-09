interface ILoginResponseData {
    _id: string,
    name: string,
    surname: string,
    type: string
}

export default interface ILoginResponse {
    data?: ILoginResponseData | any,
    accessToken?: string | any,
}