import IVolunteerRecord from './IVolunteerRecord';
import IResponse from './../IResponse';
export default interface IFetchedVolunteers extends IResponse {
    volunteers: IVolunteerRecord[] | [],
    allCount: number,
    filteredCount: number
}