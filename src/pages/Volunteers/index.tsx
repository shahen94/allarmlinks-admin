/* eslint-disable react-hooks/exhaustive-deps */
import React, {FormEvent, useEffect, useState} from 'react'
import OverallApplicants from './OverallApplicants';
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../store'
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import IProcessedVolunteerRecord from '../../types/volunteers/IProcessedVolunteer';
import {fetchAll} from '../../store/features/volunteersSlice';
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {put} from "../../utils/fetch";
import {endpoint} from "../../config";

const WorkStatusComponent = (props: any) => {
    const workStatus = props?.workStatus;
    const [disabled, setDisabled] = useState(false);
    const [status, setStatus] = useState(workStatus);
    const toggleChecked = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        console.log('OK');
        setDisabled(checked);
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(status)
        const url = endpoint + "/admin/volunteers/workstatus/" + props._id;
        const body = {workStatus: status};

        console.log(url);
        console.log(body);

        put(url, body)
            .then(r => console.log(r))
            .catch(e => console.error(e.data));
    }

    return (
        <form style={{
            display: "flex",
            alignItems: "center"
        }} onSubmit={submit}>
            <Switch checked={disabled} onChange={toggleChecked}/>
            <TextField
                placeholder="Work status"
                variant="outlined"
                disabled={!disabled}
                style={{width: 150}}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
            />
        </form>
    );
};

const useStyles = makeStyles({
    root: {
        backgroundColor: '#f4f4f4',
        border: 'none'
    },

});

const Volunteers = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes: Record<string, string> = useStyles();
    const volunteersCount: number = useSelector((state: RootState) => state.volunteers.allCount)
    const processedVolunteers: IProcessedVolunteerRecord[] = useSelector((state: RootState) => state.volunteers.processedVolunteers)

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
                            <TableCell className="table-header" align="center">Name</TableCell>
                            <TableCell className="table-header" align="center">Surname</TableCell>
                            <TableCell className="table-header" align="center">Email</TableCell>
                            <TableCell className="table-header" align="center">Phone</TableCell>
                            <TableCell className="table-header" align="center">Country</TableCell>
                            <TableCell className="table-header" align="center">Specialization</TableCell>
                            <TableCell className="table-header" align="center">Work status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {processedVolunteers.map((row) => (
                            <TableRow key={row.id} className={classes.hideLastBorder}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.surname}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">{row.country}</TableCell>
                                <TableCell align="center">{row.specialization}</TableCell>
                                <TableCell align="center">
                                    <WorkStatusComponent
                                        workStatus={!row.workStatus ? "Empty" : row.workStatus}
                                        _id={row._id}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Volunteers