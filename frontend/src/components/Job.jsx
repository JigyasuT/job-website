import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Button } from "./ui/button";
import { AvatarImage } from "./ui/avatar";
import { Avatar } from "./ui/avatar";
import { Navigate, useNavigate } from "react-router-dom";
import JobDescription from "./JobDescription";
const Job = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "12dfgfdbfgghnhnfnhg";
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentTime=new Date();
    const timeDifference=currentTime-createdAt;
    return Math.floor(timeDifference/(1000*42*60*60));
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between ">
        <p className="text-sm text-gray-900">{daysAgoFunction (job?.createdAt)===0? "Tday":`${daysAgoFunction(job?.createdAt)}`} days ago</p>
        <Button className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 ">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-red-700 font-bold"} variant="ghost">
          
          {job?.jobType}
        </Badge>
        <Badge className={"text-purple-700 font-bold"} variant="ghost">
         {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Detains
        </Button>
        <Button className={"bg-purple-600"}>Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
