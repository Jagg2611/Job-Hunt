import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { setAllAdminJobs } from "@/redux/jobSlice";

const companyArray = []; //Make sure job should be registered before posting
const PostJob = () => {
    const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    positions: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Server Response:", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
        // dispatch(setAllAdminJobs([...allAdminJobs, res.data.job]));
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          action=""
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Vacant Positions</Label>
              <Input
                type="number"
                name="positions"
                value={input.positions}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 my-1"
              />
              {companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-[180px] hover:border-black hover:bg-slate-100">
                    <SelectValue placeholder="  Select a Company " />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {companies.map((company) => {
                        return (
                          <SelectItem
                            key={company._id}
                            value={company?.name?.toLowerCase()}
                            className="hover:bg-slate-100"
                          >
                            {company.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-black text-white hover:bg-white hover:text-black"
            >
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              {" "}
              <span className="text-black">Note:</span> Please Register your
              company before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
