import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Avatar>
          <AvatarImage
            src={job?.company?.logo || "/default-logo.png"}
            alt="Company Logo"
          />
        </Avatar>
        <div>
          <h1 className="font-medium text-lg">
            {job?.company?.name || "Company Name"}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title || "Job Title"}</h1>
        <p className="text-sm text-gray-600">
          {job?.description || "Job description not available."}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.positions || "N/A"} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType || "Job Type"}
        </Badge>
        <Badge className="text-[#7209B7] font-bold" variant="ghost">
          {job?.salary ? `${job.salary} LPA` : "Salary not disclosed"}
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209B7] text-white hover:bg-black">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
