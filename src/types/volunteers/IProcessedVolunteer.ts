export default interface IProcessedVolunteerRecord {
    _id: string,
    id: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    country: string,
    specialization?: string,
    workStatus?: string,
}
