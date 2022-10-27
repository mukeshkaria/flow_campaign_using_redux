import React, { useState, useEffect } from "react";
import classes from "./Campaign.module.css";
import CampaignSearch from "./CampaignSearch";
import CampaignList from "./CampaignList";

const Campaign = () => {
  const [campaigns, setCampaings] = useState([]);
  const [filteredCampaings, setFilteredCampaings] = useState([]);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [searchName, setSearchName] = useState(undefined);

  const onStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const onEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const onSearchNameChange = (searchName) => {
    setSearchName(searchName);
  };

  const isCampaignActive = (startDate, endDate) => {
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const nowTime = new Date().getTime();

    if(startTime < nowTime && endTime > nowTime) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    const loadedUsers = [];
    const loadedCampaings = [];

    const fetchUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const responseData = await response.json();

      for (const key in responseData) {
        loadedUsers.push({
          id: responseData[key].id,
          name: responseData[key].name,
        });
      }

      fetchCampaings();
    };
    fetchUsers();

    const getUser = (userId) => {
      const user = loadedUsers.find((item) => item.id === userId);
      if (user === undefined) {
        return "Unkown user";
      }

      return user.name;
    };

    const fetchCampaings = async () => {
      const response = await fetch(
        "https://react-test-cea3a-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns.json"
      );
      const responseData = await response.json();

      for (const key in responseData) {
        loadedCampaings.push({
          id: key,
          name: responseData[key].name,
          username: getUser(responseData[key].userId),
          startDate: responseData[key].startDate,
          endDate: responseData[key].endDate,
          isActive: isCampaignActive(responseData[key].startDate, responseData[key].endDate),
          budget: responseData[key].budget,
        });
      }

      setCampaings(loadedCampaings);
      setFilteredCampaings(loadedCampaings);
    };
  }, []);

  useEffect(() => {
    const filteredList = campaigns.filter((item) => {
      const startTime = new Date(item.startDate).getTime();
      const endTime = new Date(item.endDate).getTime();
      const name = item.name;
      const startDateFilter =
        startDate !== undefined ? startTime >= startDate.getTime() : true;
      const endDateFilter =
        endDate !== undefined ? endTime <= endDate.getTime() : true;
      const searchNameFilter =
        searchName !== undefined
          ? name.toLowerCase().indexOf(searchName.toLowerCase()) >= 0
          : true;

      if (startDateFilter && endDateFilter && searchNameFilter) {
        return true;
      }

      return false;
    });
    setFilteredCampaings(filteredList);
  }, [startDate, endDate, searchName, campaigns]);

  return (
    <main className={classes.container}>
      <div className={classes["inner-container"]}>
        <CampaignSearch
          startDateValue={startDate}
          endDateValue={endDate}
          searchNameValue={searchName}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          onSearchNameChange={onSearchNameChange}
        />
        <CampaignList campaigns={filteredCampaings} />
      </div>
    </main>
  );
};

export default Campaign;
