/* eslint-disable react-hooks/exhaustive-deps */
import React, {FormEvent, useEffect, useState} from 'react'
import OverallApplicants from './OverallApplicants';
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../store'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import IProcessedVolunteerRecord from '../../types/volunteers/IProcessedVolunteer';
import {fetchAll} from '../../store/features/volunteersSlice';
import TextField from "@material-ui/core/TextField";
import Switch, {SwitchClassKey, SwitchProps} from "@material-ui/core/Switch";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {put} from "../../utils/fetch";
import {endpoint} from "../../config";
import withStyles from "@material-ui/core/styles/withStyles";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
}

interface Props extends SwitchProps {
    classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 42,
            height: 26,
            padding: 0,
            margin: theme.spacing(1),
        },
        switchBase: {
            padding: 1,
            '&$checked': {
                transform: 'translateX(16px)',
                color: theme.palette.common.white,
                '& + $track': {
                    backgroundColor: '#2524d6',
                    opacity: 1,
                    border: 'none',
                },
            },
            '&$focusVisible $thumb': {
                color: '#52d869',
                border: '6px solid #fff',
            },
        },
        thumb: {
            width: 24,
            height: 24,
        },
        track: {
            borderRadius: 26 / 2,
            border: `1px solid ${theme.palette.grey[400]}`,
            backgroundColor: theme.palette.grey[50],
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
    }),
)(({ classes, ...props }: Props) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

const WorkStatusComponent = (props: any) => {
    const workStatus = props?.workStatus;
    const [checked, setChecked] = useState(false);
    const [readonly, setReadonly] = useState(false);
    const [status, setStatus] = useState(workStatus);
    const toggleChecked = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (!checked) {
            setStatus(null);
            sendStatus();
        } else {
            setReadonly(false);
        }
        setChecked(checked);
    };

    const sendStatus = () => {
        const url = endpoint + "/admin/volunteers/workstatus/" + props._id;
        const body = {workStatus: status};

        put(url, body)
            .then(r => console.log(r))
            .catch(e => console.error(e.data));
    }

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(status);

        sendStatus();
        setReadonly(!readonly);
    }

    return (
        <form style={{
            display: "flex",
            alignItems: "center",
            width: 260
        }} onSubmit={submit}>
            <IOSSwitch checked={checked} onChange={toggleChecked}/>
            {
                (checked) ? ((readonly) ? <div onClick={() => setReadonly(!readonly)}>
                            {status}
                        </div> :
                        <TextField
                            placeholder="Add Company Name"
                            variant="outlined"
                            style={{width: 180, color: "#BCBCBC", backgroundColor: "white", borderColor: "#e9e9e9"}}
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                            size="small"
                        />
                ) : ""
            }
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
                        {processedVolunteers.map((row) => (
                            <TableRow key={row.id} className={classes.hideLastBorder}>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.surname}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.phone}</TableCell>
                                <TableCell align="left">{row.country}</TableCell>
                                <TableCell align="left">{row.specialization}</TableCell>
                                <TableCell align="left">
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