import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles, Theme } from "@material-ui/core/styles";
import React, { FormEvent, useEffect, useState } from "react";
import { endpoint } from "../../config";
import { put } from "../../utils/fetch";
import TextField from "@material-ui/core/TextField";
import { useRef } from "react";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

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
      height: 22,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(20px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#2524d6",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 20,
      height: 20,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
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

const WorkStatusContainer = (props: {
  workStatus: string | undefined;
  _id: string;
}) => {
  const workStatus = props?.workStatus;

  const [checked, setChecked] = useState(!!workStatus);
  const [readonly, setReadonly] = useState(!!workStatus);
  const [status, setStatus] = useState(workStatus);

  const toggleChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      setReadonly(false);
    } else {
      console.log("Checked - false");
      setStatus("");
      sendStatus("");
      console.log("Checked ", status);
    }
    setChecked(checked);
  };

  const sendStatus = (workStatus: string | undefined) => {
    const url = endpoint + "/admin/volunteers/workstatus/" + props._id;
    const body = { workStatus };

    console.log(body);

    put(url, body)
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(status);

    sendStatus(status);
    setReadonly(!readonly);
  };

  return (
    <form className="volunteer-work-status" onSubmit={submit}>
      <IOSSwitch checked={checked} onChange={toggleChecked} />
      {checked ? (
        readonly ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <p> {status} </p>
            <IconButton
              style={{ color: "#3967d6" }}
              aria-label="edit"
              onClick={() => setReadonly(!readonly)}
              size="small"
            >
              <EditIcon fontSize="small"/>
            </IconButton>
          </div>
        ) : (
          <TextField
            placeholder="Add Company Name"
            variant="outlined"
            style={{
              color: "#BCBCBC",
              backgroundColor: "white",
              borderColor: "#e9e9e9",
            }}
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            size="small"
            required={true}
          />
        )
      ) : (
        ""
      )}
    </form>
  );
};

export default WorkStatusContainer;
