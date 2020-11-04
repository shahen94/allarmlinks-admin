import VolounteerRecord from './types/VolounteerRecord'
import ProcessedVolounteerRecord from './types/ProcessedVolounteerRecord'

const processVolounteersRecords = (data: VolounteerRecord[]): ProcessedVolounteerRecord[] => {
    const result: ProcessedVolounteerRecord[] = []
    for (let index: number = 0; index < data.length; index++) {
        const record = data[index];
        const processedRecord: ProcessedVolounteerRecord = {
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
export default processVolounteersRecords