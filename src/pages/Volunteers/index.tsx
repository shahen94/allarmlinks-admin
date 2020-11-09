/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { DataGrid, ColDef, RowParams } from '@material-ui/data-grid';
import OverallApplicants from './OverallApplicants';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import IProcessedVolunteerRecord from '../../types/volunteers/IProcessedVolunteer';
import { fetchAll } from '../../store/features/volunteersSlice';

const columns: ColDef[] = [
    { field: 'id', hide: true },
    { field: '_id', hide: true },
    { field: 'name', type: 'string', headerName: 'Name', width: 160 },
    { field: 'surname', type: 'string', headerName: 'Surname', width: 160 },
    { field: 'email', type: 'string', headerName: 'Email address', width: 300 },
    { field: 'phoneNumber', type: 'string', headerName: 'Phone Number', width: 200 },
    { field: 'country', type: 'string', headerName: 'Country', width: 170 },
    { field: 'specialization', type: 'string', headerName: 'Industry of Specialization', width: 250 },
    { field: 'workStatus', type: 'string', headerName: 'Work Status', width: 150 },
]

const useStyles = makeStyles({
    root: {
        backgroundColor: '#f4f4f4',
        border: 'none'
    },

})

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
    }, [])

    const RowClickHandler = (params: RowParams): void => {
        history.push(`/volunteers/${params.data._id}`)
    }

    return (
        <div className="Volunteers">
            <div className='DataGrid-container'>
                <OverallApplicants count={volunteersCount} />
                <DataGrid
                    rows={processedVolunteers}
                    columns={columns}
                    className={classes.root}
                    pageSize={12}
                    autoHeight
                    hideFooterSelectedRowCount
                    hideFooterRowCount
                    onRowClick={RowClickHandler}
                />
            </div>
        </div>
    )
}

export default Volunteers