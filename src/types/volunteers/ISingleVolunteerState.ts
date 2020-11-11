import IAppStateData from '../IAppStateData';
import IVolunteerRecord from './IVolunteer';

export default interface ISingleVolunteerState extends IAppStateData {
    data: IVolunteerRecord
}