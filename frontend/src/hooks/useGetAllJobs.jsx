import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          }
        );
        // console.log("API response data:", JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs)); //send all jobs to react redux
          //   console.log("Dispatched jobs to Redux:", res.data.jobs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
