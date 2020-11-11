/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react'
import OverallApplicants from './OverallApplicants';
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../store'
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import IProcessedVolunteerRecord from '../../types/volunteers/IProcessedVolunteer';
import {fetchAll} from '../../store/features/volunteersSlice';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import WorkStatusContainer from "../../components/Volunteer/WorkStatusContainer";
import NoteContainer from "../../components/Volunteer/NoteContainer";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#f4f4f4',
        border: 'none'
    },

});

const Volunteers = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const classes: Record<string, string> = useStyles();
    const volunteersCount: number = useSelector((state: RootState) => state.volunteers.allCount)
    const processedVolunteers: IProcessedVolunteerRecord[] = useSelector((state: RootState) => state.volunteers.processedVolunteers)

    const CellClickHandler = (id: string): void => {
        history.push(`/volunteers/${id}`);
    }

    useEffect(() => {
        if (!processedVolunteers.length) {
            dispatch(fetchAll(10))
        }
    }, []);

    return (
        <div className="Volunteers">


            <TableContainer className="DataGrid-container">
                <OverallApplicants count={volunteersCount}/>
                <Table size="small" aria-label="Volunteers">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header" align="left">Name</TableCell>
                            <TableCell className="table-header" align="left">Surname</TableCell>
                            <TableCell className="table-header" align="left">Email</TableCell>
                            <TableCell className="table-header" align="left">Phone</TableCell>
                            <TableCell className="table-header" align="left">Country</TableCell>
                            <TableCell className="table-header" align="left">Specialization</TableCell>
                            <TableCell className="table-header" align="left">Work status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {processedVolunteers.map((row) => {
                            console.log(row);
                            return (
                                <TableRow key={row.id} className={classes.hideLastBorder}>
                                    <TableCell align="left"
                                               onClick={(e) => CellClickHandler(row._id)}>{row.name}</TableCell>
                                    <TableCell align="left"
                                               onClick={(e) => CellClickHandler(row._id)}>{row.surname}</TableCell>
                                    <TableCell align="left"
                                               onClick={(e) => CellClickHandler(row._id)}>{row.email}</TableCell>
                                    <TableCell align="left"
                                               onClick={(e) => CellClickHandler(row._id)}>{row.phone}</TableCell>
                                    <TableCell align="left"
                                               onClick={(e) => CellClickHandler(row._id)}>{row.country}</TableCell>
                                    <TableCell align="left"
                                               onClick={(e) => CellClickHandler(row._id)}>{row.specialization}</TableCell>
                                    <TableCell align="left">
                                        <WorkStatusContainer
                                            workStatus={row.workStatus}
                                            _id={row._id}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Volunteers;