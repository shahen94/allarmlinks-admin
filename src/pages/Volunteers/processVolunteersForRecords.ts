import IVolunteerRecord from './types/IVolunteerRecord'
import IProcessedVolunteerRecord from './types/IProcessedVolunteerRecord'

const processVolunteersRecords = (data: IVolunteerRecord[]): IProcessedVolunteerRecord[] => {
    const result: IProcessedVolunteerRecord[] = []
    for (let index: number = 0; index < data.length; index++) {
        const record = data[index];
        const processedRecord: IProcessedVolunteerRecord = {
            _id: record._id,
            id: index,
            firstName: record.firstName,
            lastName: record.lastName,
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