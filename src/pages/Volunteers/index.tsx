import React from 'react'
import { DataGrid, ColDef } from '@material-ui/data-grid';
import { rows } from './SampleRecords';
import OverallApplicants from './OverallApplicants';
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { makeStyles } from '@material-ui/core/styles';

const columns: ColDef[] = [
    { field: 'firstName', type: 'string', headerName: 'First name', width: 130 },
    { field: 'lastName', type: 'string', headerName: 'Last name', width: 130 },
    { field: 'email', type: 'string', headerName: 'Email address', width: 130 },
    { field: 'phoneNumber', type: 'string', headerName: 'Phone Number', width: 130 },
    { field: 'country', type: 'string', headerName: 'Country', width: 130 },
    { field: 'specialization', type: 'string', headerName: 'Industry of Specialization', width: 250 },
    { field: 'workStatus', type: 'string', headerName: 'Work Status', width: 130 },
]

const useStyles = makeStyles({
    root: {
        //height: '80vh!important',
        backgroundColor: '#f4f4f4',
        border: 'none'
    },

})

const Volunteers = () => {
    const classes = useStyles();
    const volunteersCount: number = useSelector((state: RootState) => state.volounteersCount)
    return (
        <div className='DataGrid-container'>
            <OverallApplicants count={volunteersCount} />
            <DataGrid rows={rows} columns={columns} className={classes.root} pageSize={20} autoHeight hideFooterSelectedRowCount hideFooterRowCount />
        </div>
    )
}

export default Volunteers