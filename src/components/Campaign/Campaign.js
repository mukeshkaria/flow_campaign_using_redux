import React, { useState, useEffect } from "react";
import classes from "./Campaign.module.css";
import CampaignSearch from "./CampaignSearch";
import CampaignList from "./CampaignList";
import { useDispatch } from "react-redux";
import { fetchCampaings } from "../../store/campaign-actions";

const Campaign = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState();

  useEffect(() => {
    const loadedUsers = [];

    const fetchUsers = async () => {
      console.log("In fetch users");

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

      setUsers(loadedUsers);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    dispatch(fetchCampaings(users));
  }, [users, dispatch]);

  return (
    <main className={classes.container}>
      <div className={classes["inner-container"]}>
        <CampaignSearch />
        <CampaignList />
      </div>
    </main>
  );
};

export default Campaign;
