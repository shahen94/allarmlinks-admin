import IVolunteerRecord from '../types/volunteers/IVolunteerRecord'
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
            phone: record.phone,
            country: record.country,
            specialization: record.specialization,
            workStatus: record.workStatus
        }
        result.push(processedRecord)
    }
    return result
}
export default processVolunteersRecords