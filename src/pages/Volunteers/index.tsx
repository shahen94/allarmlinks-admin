/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { fetchAll,fectchAllAndAttach } from '../../store/features/volunteersSlice';
import TextField from "@material-ui/core/TextField";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { put } from '../../utils/fetch';
import { endpoint } from '../../config';
import withStyles from '@material-ui/core/styles/withStyles';
import IVolunteerRecord from '../../types/volunteers/IVolunteerRecord';
import WorkStatusContainer from '../../components/WorkStatus/WorkStatusContainer';
import SubHeader from './SubHeader';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f4f4f4',
    border: 'none',
  },
});

const Volunteers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes: Record<string, string> = useStyles();
  const volunteersCount: number = useSelector(
    (state: RootState) => state.volunteers.allCount
  );
  const volunteers: IVolunteerRecord[] = useSelector(
    (state: RootState) => state.volunteers.data
  );

  const CellClickHandler = (id: string): void => {
    history.push(`/volunteers/${id}`);
  };

    useEffect(() => {
        if (!volunteers.length) {
            dispatch(fetchAll({limit:20}))
        }
    }, [])
    const handleNext = ()=>{
        dispatch(fectchAllAndAttach({limit:20,pointer:volunteers[volunteers.length - 1]._id,}))
    }
    return (
        <div className="main-container">
            <TableContainer>
                <SubHeader count={volunteersCount} />
                        <InfiniteScroll
                            dataLength={volunteers.length}
                            next={handleNext}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                        >
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
                        {volunteers && volunteers.map((row,index) => {
                            return (
                                <TableRow key={row._id} className={classes.hideLastBorder}>
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
                        </InfiniteScroll>
            </TableContainer>
        </div>
    )
}

export default Volunteers;
