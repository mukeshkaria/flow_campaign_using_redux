import { configureStore } from "@reduxjs/toolkit";
import campaignSlice from "./campaign-slice";

const store = configureStore({
    reducer : {campaign : campaignSlice.reducer}
});

export default store;