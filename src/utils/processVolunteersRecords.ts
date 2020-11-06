import IVolunteerRecord from '../types/volunteers/IVolunteer'
import IProcessedVolunteerRecord from '../types/volunteers/IProcessedVolunteer'

const processVolunteersRecords = (data: IVolunteerRecord[]): IProcessedVolunteerRecord[] => {
    const result: IProcessedVolunteerRecord[] = []
    for (let index: number = 0; index < data.length; index++) {
        const record = data[index];
        const processedRecord: IProcessedVolunteerRecord = {
            _id: record._id,
            id: index,
            name: record.name,
            surname: record.surname,
            email: record.email,
            phoneNumber: record.phoneNumber,
            country: record.country,
            specialization: record.specialization,
        }
        result.push(processedRecord)
    }
    return result
}
export default processVolunteersRecords