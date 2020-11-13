/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import {fectchAllAndAttach, fetchAll} from '../../store/features/volunteersSlice';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IVolunteerRecord from '../../types/volunteers/IVolunteerRecord';
import WorkStatusContainer from '../../components/WorkStatus/WorkStatusContainer';
import SubHeader from './SubHeader';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ActionStatus} from "../../types/auth/ILoginData";
import "../../styles/global.scss"
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
  const fetchVolunteersStatus = useSelector(
      (state: RootState) => state.volunteers.status
  );
    const filterType:string = useSelector(
        (state:RootState) => state.search.type
    )
    const filterValue:string = useSelector(
        (state:RootState) => state.search.value
    )
    const hasMore = useSelector(
        (state:RootState) => state.volunteers.hasNext
    )
  const CellClickHandler = (id: string): void => {
    history.push(`/volunteers/${id}`);
  };
    useEffect(() => {
        if (!volunteers.length) {
            dispatch(fetchAll({limit:20}))
        }
    }, [])
    const handleNext = ()=>{
        if(filterValue)
            dispatch(fectchAllAndAttach({limit:20,pointer:volunteers[volunteers.length - 1]._id,type:filterType,value:filterValue}))
        else
            dispatch(fectchAllAndAttach({limit:20,pointer:volunteers[volunteers.length - 1]._id}))
    }
    return (
        <div className="main-container">
            <TableContainer>
                <SubHeader count={volunteersCount} />
                        <InfiniteScroll
                            dataLength={volunteers.length}
                            next={handleNext}
                            hasMore={hasMore}
                            loader={<div className = "loader-container">
                                <CircularProgress disableShrink className="loader" />
                            </div>}
                        >
                            {fetchVolunteersStatus===ActionStatus.Success &&<Table size="small" aria-label="Volunteers">
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
                                            <TableRow key={row._id}>
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
                            </Table>}
                            {fetchVolunteersStatus===ActionStatus.Pending &&
                            <div className = "loader-container">
                                <CircularProgress disableShrink className="loader"/>
                            </div>}
                        </InfiniteScroll>
            </TableContainer>
        </div>
    )
}

export default Volunteers;
