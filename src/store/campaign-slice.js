import { createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    campaigns: [],
    filteredCampaigns: [],
    startDate: undefined,
    endDate: undefined,
    searchName: undefined,
  },
  reducers: {
    addCampaings(state, action) {
      state.campaigns = action.payload;
      state.filteredCampaigns = action.payload;
    },
    filterChanged(state, action) {
      const { type, value } = action.payload;

      if (type === "START_DATE_CHANGE") {
        state.startDate = value;
      } else if (type === "END_DATE_CHANGE") {
        state.endDate = value;
      } else if (type === "SEARCH_NAME_CHANGE") {
        state.searchName = value;
      }

      const filteredList = state.campaigns.filter((item) => {
        const startTime = new Date(item.startDate).getTime();
        const endTime = new Date(item.endDate).getTime();
        const name = item.name;
        const startDateFilter =
          state.startDate !== undefined
            ? startTime >= state.startDate.getTime()
            : true;
        const endDateFilter =
          state.endDate !== undefined
            ? endTime <= state.endDate.getTime()
            : true;
        const searchNameFilter =
          state.searchName !== undefined
            ? name.toLowerCase().indexOf(state.searchName.toLowerCase()) >= 0
            : true;

        if (startDateFilter && endDateFilter && searchNameFilter) {
          return true;
        }

        return false;
      });
      state.filteredCampaigns = filteredList;
    },
  },
});

export const campaignActions = campaignSlice.actions;

export default campaignSlice;
