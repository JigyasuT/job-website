import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Company_API_END_POINT } from "../../../utils/constant.js";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../../redux/companySlice.js";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const registeredNewCompany = async() => {
    try {
      const res = await axios.post(
        `${Company_API_END_POINT}/register`,
        {name},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            what would you like to your company name? you can change this later...
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt,Microsoft etc..."
          onChange={(e)=>setName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant={"outline"}
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            onClick={registeredNewCompany}
            className={"bg-black text-amber-100"}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
