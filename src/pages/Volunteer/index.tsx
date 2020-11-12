import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { fetchById } from '../../store/features/singleVolunteerSlice';
import IVolunteerRecord from '../../types/volunteers/IVolunteerRecord';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ArrowBack from '@material-ui/icons/ArrowBack';
import VolunteerInfoField from './VolunteerInfoField';
import WorkStatusContainer from '../../components/Volunteer/WorkStatusContainer';
import SocialLinks from './SocialLinks';

import './volunteer.scss';
import NoteContainer from '../../components/Volunteer/NoteContainer';

interface IParams {
  id: string;
}

const useStyles = makeStyles({
  linkToVolunteers: {
    display: 'flex',
    alignItems: 'center',
    margin: '2rem 1rem 0.5rem',
  },

  fullName: {
    margin: '0.5rem 0.5rem 1rem 1.5rem ',
    fontWeight: 700,
    textTransform: 'capitalize',
  },

  description: {
    fontWeight: 700,
    margin: '1rem 0',
  },
});
const Volunteer = () => {
  const dispatch = useDispatch();
  const id: string = useParams<IParams>().id;
  const classes = useStyles();
  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id]);
  const volunteer: IVolunteerRecord = useSelector(
    (state: RootState) => state.singleVolunteer.data
  );

  return !volunteer._id ? (
    <CircularProgress
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
      }}
    />
  ) : (
    <div className="volunteer">
      <Link className={classes.linkToVolunteers} href="/volunteers">
        <ArrowBack /> back to all volunteers
      </Link>

      <Typography
        variant="h5"
        component="h2"
        className={classes.fullName}
      >{`${volunteer.name} ${volunteer.surname}`}</Typography>

      <div className="container">
        <Typography
          className={classes.description}
          component="h6"
          variant="body1"
        >
          personal info
        </Typography>
        <div className="gridCont">
          <div className="line gridFirst">
            <VolunteerInfoField
              fieldName="name"
              fieldContent={volunteer.name}
            />
            <VolunteerInfoField
              fieldName="Surname"
              fieldContent={volunteer.surname}
            />
            <VolunteerInfoField
              fieldName="email"
              fieldContent={volunteer.email}
            />
            <VolunteerInfoField
              fieldName="phone"
              fieldContent={volunteer.phone}
            />
            <VolunteerInfoField
              fieldName="Birth date"
              fieldContent={volunteer.birthDate}
            />
            <div className="generalInfo-field">
              <Typography
                color="textSecondary"
                variant="body1"
                component="span"
              >
                work status
              </Typography>
              <WorkStatusContainer workStatus={volunteer.workStatus} />
            </div>
          </div>
          <div className="line gridSecond">
            <VolunteerInfoField
              fieldName="Country"
              fieldContent={volunteer.country}
            />
            <VolunteerInfoField
              fieldName="City"
              fieldContent={volunteer.city}
            />
            <VolunteerInfoField
              fieldName="Address"
              fieldContent={volunteer.address}
            />
            <VolunteerInfoField
              fieldName="Industry of specialization"
              fieldContent={volunteer.specialization}
            />
            <VolunteerInfoField
              fieldName="Current employer name"
              fieldContent={volunteer.currentEmployerName}
            />
            <VolunteerInfoField
              fieldName="Occupation"
              fieldContent={volunteer.occupation}
            />
          </div>
          <div className="line gridThird">
            <VolunteerInfoField
              fieldName="Skills"
              fieldContent={volunteer.skills?.join(', ')}
            />
            <VolunteerInfoField
              fieldName="Languages"
              fieldContent={volunteer.languages?.join(', ')}
            />
            <VolunteerInfoField
              fieldName="Availability hours per week"
              fieldContent={`${volunteer.hoursPerWeek?.from} - ${volunteer.hoursPerWeek?.to}`}
            />
            <VolunteerInfoField
              fieldName="Where do you prefer to volunteer"
              fieldContent={volunteer.whereToVolunteer}
            />
            <VolunteerInfoField
              fieldName="Other info which you would like to to share"
              fieldContent={volunteer.other}
            />
          </div>
        </div>
        <div className="footer">
          <div className="social-icons">
            <SocialLinks
              fieldName="Facebook"
              link={volunteer.facebookProfile}
            />
            <SocialLinks
              fieldName="LinkedIn"
              link={volunteer.linkedinProfile}
            />
            <SocialLinks fieldName="Twitter" link={volunteer.twitterProfile} />
          </div>
          <NoteContainer note={volunteer.note} _id={volunteer._id} />
        </div>
      </div>
    </div>
  );
};
export default Volunteer;

// let from_store:IVolunteerRecord | {} = useSelector((state: RootState) => {
//     const from_state = state.volunteers.volunteers.filter((elm: IVolunteerRecord) => elm._id === id)
//     if(from_state.length){
//         return from_state[0]
//     }
//     else if(state.singleVolunteer._id === id){
//         return state.singleVolunteer
//     }
//     else
//         return {}
// })
// if(!Object.keys(from_store).length){
//     dispatch(fetchById(id))
// }
