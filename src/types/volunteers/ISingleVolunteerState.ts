import IAppStateData from '../IAppStateData';
import IVolunteerRecord from './IVolunteerRecord';

export default interface ISingleVolunteerState extends IAppStateData {
    data: IVolunteerRecord
}