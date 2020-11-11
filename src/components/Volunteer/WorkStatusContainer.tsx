import Switch, {SwitchClassKey, SwitchProps} from "@material-ui/core/Switch";
import withStyles from "@material-ui/core/styles/withStyles";
import {createStyles, Theme} from "@material-ui/core/styles";
import React, {FormEvent, useEffect, useState} from "react";
import {endpoint} from "../../config";
import {put} from "../../utils/fetch";
import TextField from "@material-ui/core/TextField";

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

const WorkStatusContainer = (props: any) => {
    const workStatus = props?.workStatus;

    console.log(workStatus);

    const [checked, setChecked] = useState(!!workStatus);
    const [readonly, setReadonly] = useState(!!workStatus);
    const [status, setStatus] = useState(workStatus);

    useEffect(() => {
        sendStatus();
    }, [checked, status]);

    const toggleChecked = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked) {
            setReadonly(false);
        } else {
            console.log("Checked - false");
            setStatus("");
            console.log("Checked ", status);
        }
        setChecked(checked);
    };

    const sendStatus = () => {
        const url = endpoint + "/admin/volunteers/workstatus/" + props._id;
        const body = {workStatus: status};

        console.log(body);

        put(url, body)
            .then(r => console.log(r))
            .catch(e => console.error(e));
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
                            required={true}
                        />
                ) : ""
            }
        </form>
    );
};

export default WorkStatusContainer;