import React from "react";
import classes from "./CampaignSearch.module.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import { campaignActions } from "../../store/campaign-slice";

const CampaignSearch = () => {
  const dispatch = useDispatch();
  const startDateValue = useSelector((state) => state.campaign.startDate);
  const endDateValue = useSelector((state) => state.campaign.endDate);
  const searchNameValue = useSelector((state) => state.campaign.searchName);

  const startDateChangeHandler = (newValue) => {
    dispatch(
      campaignActions.filterChanged({
        type: "START_DATE_CHANGE",
        value: newValue.toDate(),
      })
    );
  };

  const endDateChangeHandler = (newValue) => {
    dispatch(
      campaignActions.filterChanged({
        type: "END_DATE_CHANGE",
        value: newValue.toDate(),
      })
    );
  };

  const searchNameChangeHandler = (event) => {
    dispatch(
      campaignActions.filterChanged({
        type: "SEARCH_NAME_CHANGE",
        value: event.target.value,
      })
    );
  };

  const clearFilterHandler = (event) => {
    dispatch(
      campaignActions.filterChanged({
        type: "START_DATE_CHANGE",
        value: undefined,
      })
    );
    dispatch(
      campaignActions.filterChanged({
        type: "END_DATE_CHANGE",
        value: undefined,
      })
    );
    dispatch(
      campaignActions.filterChanged({
        type: "SEARCH_NAME_CHANGE",
        value: "",
      })
    );
  };

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
        (searchNameValue !== undefined && searchNameValue.length !== 0)) && (
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
