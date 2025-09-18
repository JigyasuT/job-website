import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"; 
import { useSelector } from "react-redux";
// import { setLoading } from "redux/authSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "../../../utils/constant.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position:0,
    companyId:"",
  });
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const {companies}=useSelector(store=>store.company)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const selectChangeHandler=(value)=>{
     const selectedCompany=companies.find((company)=>company.name.toLowerCase()===value);
      setInput({...input,companyId:selectedCompany?._id})
  }
  const submitHandler=async (e)=>{
    e.preventDefault();
     try {
       setLoading(true);
       const res=await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
       })
       if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/jobs");
       }
     } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
     }finally{
      setLoading(false)
     }
  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
         <form  onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-300 shadow-lg rounded-md"> 
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              value={input.title}
              onChange={changeEventHandler}
              name="title"
              className={
                "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              }
            />
          </div>
           <div>
            <Label>Description</Label>
            <Input
              type="text"
              value={input.description}
              onChange={changeEventHandler}
              name="description"
              className={
                "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              }
            />
          </div>
           <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              value={input.requirements}
              onChange={changeEventHandler}
              name="requirements"
              className={
                "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              }
            />
          </div>
           <div>
            <Label>Salary</Label>
            <Input
              type="text"
              value={input.salary}
              onChange={changeEventHandler}
              name="salary"
              className={
                "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              }
            />
          </div>
           <div>
            <Label>Location</Label>
            <Input
              type="text"
              value={input.location}
              onChange={changeEventHandler}
              name="location"
              className={
                "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              }
            />
          </div>
           <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              value={input.jobType}
              onChange={changeEventHandler}
              name="jobType"
              className={
                "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              }
            />
          </div>
           <div>
            <Label>Experience Level</Label>
            <Input
              type="text"
              value={input.experience}
              onChange={changeEventHandler}
              name="experience"
              className={
                "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              }
            />
          </div>
           <div>
            <Label>No of Positions</Label>
            <Input
              type="number"
              value={input.position}
              onChange={changeEventHandler}
              name="position"
              className={
                "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              }
            />
          </div>
          {
            companies.length>0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                   <SelectGroup>
                      {
                        companies.map((company)=>{
                           return (
                            <SelectItem  key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem> 
                           )
                        })
                      }
                   </SelectGroup>
                </SelectContent>
              </Select>
            )
          }
        </div>
        
        {
          loading ? <Button className={"w-full my-4"}><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>:<Button type="submit" className={"w-full mt-12 bg-blue-700 text-amber-100 cursior-pointer"}>Post New Jobs</Button> 
        }
        {
          companies.length===0 && <p className="text-md text-red-600 font-bold text-center my-3">Please register a company, before posting a jobs</p>
        }
        </form>
      </div>
    </div>
  );
};

export default PostJob;
