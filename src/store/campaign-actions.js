import { campaignActions } from "./campaign-slice";

export const fetchCampaings = (users) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-test-cea3a-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    const isCampaignActive = (startDate, endDate) => {
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();
      const nowTime = new Date().getTime();

      if (startTime < nowTime && endTime > nowTime) {
        return true;
      }

      return false;
    };

    const getUser = (userId) => {
      const user = users.find((item) => item.id === userId);
      if (user === undefined) {
        return "Unkown user";
      }

      return user.name;
    };

    try {
      const campaignData = await fetchData();
      const loadedCampaings = [];

      for (const key in campaignData) {
        loadedCampaings.push({
          id: key,
          name: campaignData[key].name,
          username: getUser(campaignData[key].userId),
          startDate: campaignData[key].startDate,
          endDate: campaignData[key].endDate,
          isActive: isCampaignActive(
            campaignData[key].startDate,
            campaignData[key].endDate
          ),
          budget: campaignData[key].budget,
        });
      }

      dispatch(campaignActions.addCampaings(loadedCampaings));
    } catch (error) {
      console.log("Failed to fetch campaign data [" + error + "]");
    }
  };
};
