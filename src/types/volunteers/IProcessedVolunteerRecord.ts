export default interface IProcessedVolunteerRecord {
    _id: string,
    id: number,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    country: string,
    specialization?: string,
    workStatus?: string,
}
