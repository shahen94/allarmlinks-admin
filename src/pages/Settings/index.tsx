import React, { ReactElement } from 'react'
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { rows } from './SampleAdmins';
import { Redirect, useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#f4f4f4',
        border: 'none',
        overflowY: 'hidden'
    },
    table: {
        minWidth: 650,
        backgroundColor: '#f4f4f4'
    },
    tableHead: {
        fontWeight: 'bolder'
    },
    tableCell: {
        padding: '8px 16px',
        border: 'none'
    }
})

interface IProps {

}

const Settings = (props: IProps) => {
    const classes: Record<string, string> = useStyles();
    const history = useHistory();

    const handleEdit = (/*id: string*/) => {
        history.push("/")
    }

    const handleDelete = () => {
        history.push("/settings")
    }

    // const CellRenderer = (params: CellParams): ReactElement => {
    //     return (
    //         <div>
    //             <div className={classes.root}>
    //                 <IconButton aria-label="delete" onClick={handleEdit}>
    //                     <EditIcon />
    //                 </IconButton>
    //                 <IconButton aria-label="">
    //                     <DeleteIcon />
    //                 </IconButton>
    //             </div>
    //         </div>
    //     )
    // }

    // const columns: ColDef[] = [
    //     { field: 'id', hide: true },
    //     { field: 'name', type: 'string', headerName: 'Name', width: 150 },
    //     { field: 'surname', type: 'string', headerName: 'Surname', width: 150 },
    //     { field: 'email', type: 'string', headerName: 'Email address', width: 300 },
    //     { field: 'controls', type: 'string', headerName: 'Edit/Delete', width: 300, renderCell: CellRenderer }
    // ]
    // const RowClickHandler = (params: RowParams): void => {
    //     history.push("/home")
    // }

    // return (
    //     <div className='DataGrid-container'>
    //         <IconButton aria-label="">
    //             <AddIcon />
    //         </IconButton>
    //         <DataGrid 
    //             rows={rows}
    //             columns={columns}
    //             className={classes.root}
    //             pageSize={20}
    //             autoHeight
    //             hideFooterSelectedRowCount
    //             hideFooterRowCount
    //             //onRowClick={RowClickHandler}
    //         />
    //     </div>
    // )

    return (
        <div className='DataGrid-container'>
            <IconButton aria-label="">
                <AddIcon />
            </IconButton>
            <TableContainer className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead}>Name</TableCell>
                            <TableCell className={classes.tableHead}>Surname</TableCell>
                            <TableCell className={classes.tableHead}>Email Address</TableCell>
                            <TableCell align="right" className={classes.tableHead}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className={classes.tableCell}>{row.name}</TableCell>
                                <TableCell className={classes.tableCell}>{row.surname}</TableCell>
                                <TableCell className={classes.tableCell}>{row.email}</TableCell>
                                <TableCell align="right" className={classes.tableCell}>
                                    <IconButton aria-label="edit" onClick={handleEdit}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={handleDelete}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Settings;
