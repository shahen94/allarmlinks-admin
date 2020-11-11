import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DoneIcon from "@material-ui/icons/Done";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import search from "../../api/admin/search";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    minWidth: "570px",
  },
  selectSection: {
    background: "white",
    marginRight: "1px",
    padding: "6px 30px 4px 30px",
    borderBottomLeftRadius: "20px",
    borderTopLeftRadius: "20px",
  },
  searchSection: {
    background: "white",
    marginLeft: "1px",
    padding: "4px 30px",
    borderBottomRightRadius: "20px",
    borderTopRightRadius: "20px",
    boxSizing: "border-box",
  },
  searchBtn: {
    borderRadius: "20px",
    fontSize: "0.7rem",
  },
  searchIcon: {
    position: "relative",
    top: "4px",
    right: "7px",
    color: "grey",
  },
  searchInput: {
    position: "relative",
    top: "2px",
    left: "4px",
    fontSize: "0.875rem",
  },
  selectOptions: {
    width: "80%",
    margin: "auto",
    borderTop: "2px solid #f4f4f4",
    fontSize: "0.875rem",
    wordWrap: "break-word",
    paddingLeft: "0",
  },
  selectType: {
    fontSize: "0.875rem",
    width: "180px",
    "& .Mui-selected": {
      color: "red",
    },
  },
}));
const SearchBar = (props: any) => {
  const [type, setType] = useState(props.searchTypes[0].value);
  const [searchString, setSearchString] = useState("");
  const handleTypeChange = (e: any) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(type, searchString);
    const data = await search({ type, value: searchString }, props.role);
    console.log(data);
  };

  const handleChange = (e: any) => {
    setSearchString(e.target.value);
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Grid container className={classes.searchBar} justify="flex-end">
        <Grid xs={4} item className={classes.selectSection}>
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
                {type.demoValue}
                {/* <DoneIcon /> */}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid xs={7} item className={classes.searchSection}>
          <Grid container spacing={1} wrap="nowrap" justify="space-between">
            <Grid item container wrap="nowrap">
              <Grid item className={classes.searchIcon}>
                <SearchIcon />
              </Grid>
              <Grid item>
                <InputBase
                  placeholder="Search…"
                  className={classes.searchInput}
                  value={searchString}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.searchBtn}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchBar;
