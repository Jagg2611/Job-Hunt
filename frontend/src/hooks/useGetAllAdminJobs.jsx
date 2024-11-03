import { setAllAdminJobs, setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        // console.log("API response data:", JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs)); //send all jobs to react redux
          //   console.log("Dispatched jobs to Redux:", res.data.jobs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
