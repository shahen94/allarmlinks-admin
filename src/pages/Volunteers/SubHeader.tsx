import React from 'react'
import Typography from '@material-ui/core/Typography';
import SearchBar from "../../components/SearchBar";
import { searchTypesVolunteers } from "../../types/volunteers/VolunteerSearchTypes";



interface IProps {
    count: number
}

const SubHeader = ({ count }: IProps) => {

    return (
        <div className="subheader-container">
            <Typography variant="h5" component="h5">
                {count} Volunteers
                    </Typography>
            <SearchBar role="volunteers" searchTypes={searchTypesVolunteers} />
        </div>
    )
}

export default SubHeader;