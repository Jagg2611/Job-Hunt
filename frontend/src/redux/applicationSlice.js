import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [], // Initialize applicants as an empty array
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload; // Set applicants based on the API response
    },
  },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
