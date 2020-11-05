import VolunteerRecord from './types/VolunteerRecord'
import ProcessedVolunteerRecord from './types/ProcessedVolunteerRecord'

const processVolunteersRecords = (data: VolunteerRecord[]): ProcessedVolunteerRecord[] => {
    const result: ProcessedVolunteerRecord[] = []
    for (let index: number = 0; index < data.length; index++) {
        const record = data[index];
        const processedRecord: ProcessedVolunteerRecord = {
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