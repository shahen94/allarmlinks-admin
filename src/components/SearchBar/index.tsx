import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { fetchAll } from "../../store/features/volunteersSlice";
import { searchAdmins } from "../../store/features/adminsSlice";
import { FormControl, Input, InputAdornment } from "@material-ui/core";
import "./style.scss";
import { resetSearchTypeValue, setSearchType, setSearchValue } from "../../store/features/searchSlice";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    selectSection: {
        background: "white",
        marginRight: "1px",
        padding: "6px 0px 4px 45px",
        borderBottomLeftRadius: "20px",
        borderTopLeftRadius: "20px",
    },
    searchSection: {
        background: "white",
        marginLeft: "1px",
        padding: "4px 10px 4px 15px",
        borderBottomRightRadius: "20px",
        borderTopRightRadius: "20px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
    },
    searchBtn: {
        height: "28px",
        borderRadius: "20px",
        fontSize: "0.7rem",
        margin: "0",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
    },
    searchIcon: {
        color: "grey",
    },
    selectOptions: {
        width: "auto",
        margin: "auto 14px",
        borderTop: "2px solid #f4f4f4",
        "&.Mui-selected": {
            color: "#2524d6",
            background: "white",
            "&::after": {
                content: '""',
                width: "15px",
                backgroundImage: "url(check.svg)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                fill: "#2524d6",
                height: "15px",
                position: "absolute",
                right: "5px",
                bottom: "10px",
            },
            "&:hover": {
                background: "white",
            },
        },
        "&:hover": {
            color: "#2524d6",
            background: "white",
        },
        fontSize: "0.875rem",
        padding: "5px 0",
    },
    selectType: {
        fontSize: "0.875rem",
        width: "120px",
        color: "#2524d6",
        background: "white",
    },
    formControl: {
        "& .MuiSvgIcon-root.MuiSelect-icon": {
            left: "-25px",
            right: "unset",
            color: "#2524d6",
        },
        "& .MuiSelect-select:focus": {
            background: "white",
        },
    },
    selectOptionsText: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "inline",
        margin: "0",
        paddingRight: "25px",
    },
    searchBtnIcon: {
        color: "white",
    },
    clearIcon: {
        color: "grey",
        marginRight: "5px",
        cursor: "pointer"
    }

}));

interface IProps {
    role: string;
    searchTypes: any[];
}

const SearchBar = (props: IProps) => {
    const [type, setType] = useState(props.searchTypes[0].value);
    const [searchString, setSearchString] = useState("");
    const [clear, setClear] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const dispatch = useDispatch();

    const handleTypeChange = (e: any) => {
        setType(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        if (searchString !== "") {
            dispatch(setSearchType(type))
            dispatch(setSearchValue(searchString))
            e.preventDefault();
            switch (props.role) {
                case "volunteers":
                    dispatch(fetchAll({ type, value: searchString, limit: 20 }))
                    break;
                case "admins":
                    dispatch(searchAdmins({ type, value: searchString }))
                    break;
            }
            setClear(true)
            setSearchActive(true)
        }
    };

    const handleChange = (e: any) => {
        setSearchString(e.target.value);
        if (e.target.value.length > 0)
            setClear(true)
        else
            setClear(false)

    };

    const handleClear = () => {
        setSearchString("");
        dispatch(resetSearchTypeValue());
        if (searchActive) {
            if (props.role === "volunteers")
                dispatch(fetchAll({ type, value: "", limit: 20 }))
            else
                dispatch(searchAdmins({ type, value: "" }))
            setSearchActive(false)
        }
        setClear(false)
    }

    const classes = useStyles();
    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="flex-end" wrap="nowrap" className="searchBar">
                <Grid item className={classes.selectSection}>
                    <FormControl className={classes.formControl}>
                        <Select
                            value={type}
                            onChange={handleTypeChange}
                            disableUnderline
                            className={classes.selectType}
                        >
                            {props.searchTypes.map((type: any, index: number) => (
                                <MenuItem
                                    key={type.value}
                                    value={type.value}
                                    className={classes.selectOptions}
                                    style={{
                                        borderTop: index === 0 ? "none" : "2px solid #f4f4f4",
                                    }}
                                >
                                    <p className={classes.selectOptionsText}>{type.demoValue}</p>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item container className={classes.searchSection} wrap="nowrap">
                    <div>
                        <Input
                            value={searchString}
                            onChange={handleChange}
                            placeholder="Search"
                            disableUnderline
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon className={classes.searchIcon} />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    {clear && <ClearIcon onClick={handleClear} className={classes.clearIcon} />}
                                </InputAdornment>
                            }
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.searchBtn}
                    >
                        <span className="searchTextInButton">Search</span>
                        <span className="searchIconInButton">
                            <SearchIcon className={classes.searchBtnIcon} />
                        </span>
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default SearchBar;