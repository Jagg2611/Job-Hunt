import { setSingleCompany } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = ({ companyId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        console.log("Fetching data for companyId:", companyId); // Log the companyId used
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.company);
        // console.log("API response data:", JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company)); //send all jobs to react redux
          //   console.log("Dispatched jobs to Redux:", res.data.jobs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
