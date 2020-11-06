export default interface IVolunteerRecord {
    _id: string,
    name: string,
    surname: string,
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
    hoursPerWeek?: {
        from: number,
        to: number
    },
    facebookProfile?: string,
    linkedinProfile?: string,
    twitterProfile?: string,
    whereToVolunteer?: string,
    other?: string
}