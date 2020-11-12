import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface IVolunteerInfoFieldProps {
  fieldName: string | null | undefined;
  fieldContent: string | null | undefined;
}

const useStyles = makeStyles({
  fieldName: {
    fontSize: '0.9rem',
  },

  subBody: {
    fontWeight: 700,
    fontSize: '0.9rem',
  },
});

const VolunteerInfoField: FC<IVolunteerInfoFieldProps> = ({
  fieldName,
  fieldContent,
}) => {
  const classes = useStyles();
  return (
    <div className="generalInfo-field">
      <Typography
        className={classes.fieldName}
        color="textSecondary"
        variant="body1"
        component="span"
      >
        {fieldName}
      </Typography>
      <Typography className={classes.subBody} variant="body1" component="span">
        {fieldContent}
      </Typography>
    </div>
  );
};

export default VolunteerInfoField;
