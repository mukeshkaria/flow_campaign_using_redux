import React from "react";
import classes from "./CampaignSearch.module.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const CampaignSearch = (props) => {
  const startDateValue = props.startDateValue;
  const endDateValue = props.endDateValue;
  const searchNameValue = props.searchNameValue;

  const startDateChangeHandler = (newValue) => {
    props.onStartDateChange(newValue.toDate());
  };

  const endDateChangeHandler = (newValue) => {
    props.onEndDateChange(newValue.toDate());
  };

  const searchNameChangeHandler = (event) => {
    props.onSearchNameChange(event.target.value);
  };

  const clearFilterHandler = (event) => {
    props.onStartDateChange(undefined);
    props.onEndDateChange(undefined);
    props.onSearchNameChange("");
  }

  return (
    <div className={classes.panel}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          className={classes.datePicker}
          key={startDateValue}
          label="Start Date"
          inputFormat="MM/DD/YYYY"
          value={startDateValue === undefined ? "undefined" : startDateValue}
          maxDate={endDateValue}
          onChange={startDateChangeHandler}
          renderInput={(params) => <TextField {...params} />}
        />

        <DesktopDatePicker
          className={classes.datePicker}
          key={endDateValue}
          label="End Date"
          inputFormat="MM/DD/YYYY"
          value={endDateValue === undefined ? "undefined" : endDateValue}
          minDate={startDateValue}
          onChange={endDateChangeHandler}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div className={classes.searchField}>
        <TextField
          id="outlined-basic"
          label="Search by name"
          key="search-key"
          variant="outlined"
          value={searchNameValue}
          onChange={searchNameChangeHandler}
        />
      </div>
      {(startDateValue !== undefined ||
        endDateValue !== undefined ||
        (searchNameValue !== undefined &&
        searchNameValue.length !== 0)) && (
        <Tooltip title="Clear Filters">
          <IconButton onClick={clearFilterHandler}>
            <ClearIcon color="primary" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default CampaignSearch;
