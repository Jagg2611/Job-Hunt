import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    //actions
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      // console.log("setCompanies payload:", action.payload); // Check the payload
      state.companies = action.payload;
    },
    setsearchCompanyByText: (state, action) => {
      // console.log("setCompanies payload:", action.payload); // Check the payload
      state.searchCompanyByText = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies, setsearchCompanyByText } =
  companySlice.actions;
export default companySlice.reducer;
