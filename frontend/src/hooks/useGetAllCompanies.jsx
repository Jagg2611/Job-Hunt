import { setCompanies, setSingleCompany } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/`,
          {
            withCredentials: true,
          }
        );
        // console.log("API response data:", JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies)); //send all jobs to react redux
          //   console.log("Dispatched jobs to Redux:", res.data.jobs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
