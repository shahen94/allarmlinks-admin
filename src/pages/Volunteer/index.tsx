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
import WorkStatusContainer from '../../components/WorkStatus/WorkStatusContainer';
import SocialLinks from './SocialLinks';
import './volunteer.scss';
import NoteContainer from '../../components/NoteContainer/NoteContainer';
import ErrorPage from '../../components/ErrorPage';
import { ActionStatus } from '../../types/auth/ILoginData';
import ISingleVolunteerState from '../../types/volunteers/ISingleVolunteerState';

interface IParams {
  id: string;
}

const useStyles = makeStyles({
  linkToVolunteers: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
    height: '20px',
  },

  fullName: {
    fontWeight: 700,
    textTransform: 'capitalize',
    fontSize: '1.1rem',
    color: '#525252',
  },

  description: {
    fontWeight: 700,
    margin: '0',
  },
});
const Volunteer = () => {
  const dispatch = useDispatch();
  const id: string = useParams<IParams>().id;
  const classes = useStyles();
  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id]);
  //   const volunteer: IVolunteerRecord = useSelector(
  //     (state: RootState) => state.singleVolunteer.data
  //   );
  const volunteer: ISingleVolunteerState = useSelector(
    (state: RootState) => state.singleVolunteer
  );

  const {
    _id,
    name,
    surname,
    email,
    phone,
    birthDate,
    workStatus,
    country,
    city,
    address,
    specialization,
    currentEmployerName,
    occupation,
    skills,
    languages,
    hoursPerWeek,
    whereToVolunteer,
    other,
    facebookProfile,
    linkedinProfile,
    twitterProfile,
    note,
  } = volunteer.data;

  if (volunteer.status === ActionStatus.Pending) {
    return (
      <CircularProgress
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      />
    );
  }

  if (volunteer.status === ActionStatus.Error) {
    return <ErrorPage message={volunteer.error || 'Unknown Error'} />;
  }

  return !volunteer.data._id ? (
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
        <ArrowBack /> Back to all Volunteers
      </Link>

      <Typography
        variant="h5"
        component="h2"
        className={classes.fullName}
      >{`${name} ${surname}`}</Typography>

      <div className="container">
        <Typography
          className={classes.description}
          component="h6"
          variant="body1"
        >
          Personal info
        </Typography>
        <div className="gridCont">
          <div className="line gridFirst">
            <VolunteerInfoField fieldName="name" fieldContent={name} />
            <VolunteerInfoField fieldName="Surname" fieldContent={surname} />
            <VolunteerInfoField fieldName="email" fieldContent={email} />
            <VolunteerInfoField fieldName="phone" fieldContent={phone} />
            <VolunteerInfoField
              fieldName="Birth date"
              fieldContent={birthDate ? birthDate : ''}
            />
            <div className="generalInfo-field">
              <Typography
                color="textSecondary"
                variant="body1"
                component="span"
                style={{ fontSize: '0.9rem' }}
              >
                Work status
              </Typography>
              <WorkStatusContainer _id={_id} workStatus={workStatus} />
            </div>
          </div>
          <div className="line gridSecond">
            <VolunteerInfoField fieldName="Country" fieldContent={country} />
            <VolunteerInfoField fieldName="City" fieldContent={city} />
            <VolunteerInfoField
              fieldName="Address"
              fieldContent={address ? address : ''}
            />
            <VolunteerInfoField
              fieldName="Industry of specialization"
              fieldContent={specialization ? specialization : ''}
            />
            <VolunteerInfoField
              fieldName="Current employer name"
              fieldContent={currentEmployerName ? currentEmployerName : ''}
            />
            <VolunteerInfoField
              fieldName="Occupation"
              fieldContent={occupation ? occupation : ''}
            />
          </div>
          <div className="line gridThird">
            <VolunteerInfoField
              fieldName="Skills"
              fieldContent={skills ? skills?.join(', ') : ''}
            />
            <VolunteerInfoField
              fieldName="Languages"
              fieldContent={languages ? languages?.join(', ') : ''}
            />
            <VolunteerInfoField
              fieldName="Availability hours per week"
              fieldContent={`${hoursPerWeek?.from || ''} - ${
                hoursPerWeek?.to || ''
              }`}
            />
            <VolunteerInfoField
              fieldName="Where do you prefer to volunteer"
              fieldContent={whereToVolunteer ? whereToVolunteer : ''}
            />

            <VolunteerInfoField
              fieldName="Other info which you would like to to share"
              fieldContent={other ? other : ''}
            />
          </div>
        </div>
        <div className="footer">
          <div className="social-icons">
            <SocialLinks
              fieldName="Facebook"
              link={facebookProfile ? facebookProfile : ''}
            />
            <SocialLinks fieldName="LinkedIn" link={linkedinProfile} />
            <SocialLinks fieldName="Twitter" link={twitterProfile} />
          </div>
          <NoteContainer note={note} _id={_id} />
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
