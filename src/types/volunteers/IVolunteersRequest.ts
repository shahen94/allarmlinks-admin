interface IFilter {
    field: string,
    exp: string | string[]
}
export default interface IVolunteersRequest {
    limit?: number,
    filter?: IFilter[]
}