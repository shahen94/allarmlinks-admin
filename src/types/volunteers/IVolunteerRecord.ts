export default interface IVolunteerRecord {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    birthDate: string,
    country: string,
    city: string,
    address?: string,
    specialization?: string,
    currentEmployerName?: string,
    occupation?: string,
    skills?: string[],
    languages?: string[],
    availabilityHours?: {
        from: number,
        to: number
    },
    facebookProfile?: string,
    linkedinProfile?: string,
    twitterProfile?: string,
    preferedVolunteerPlace?: string,
    otherInfo?: string
}