export default interface IProcessedVolunteerRecord {
    _id: string,
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    country: string,
    specialization?: string,
    workStatus?: string,
}
