import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { setUser } from "../../../redux/authSlice.js";

const Navbar = () => {
  // let [user, setUser] = useState(false);
  const {user}=useSelector(store=>store.auth)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutHandler=async()=>{
    try {
      const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
      dispatch(setUser(null))
      navigate("/");
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }
  return (
    <>
      <div className="bg-white">
        <div className="flex items-center justify-between mx-auto max-w-6xl h-16">
          <div>
            <h1 className="text-2xl font-bold">
              job<span className="text-purple-700 ">Portal</span>
            </h1>
          </div>

          <div className="flex items-center gap-12">
            <ul className="flex font-medium items-center gap-5">
             {
              user && user.role==="recruiter" ? (
                <>
                  <Link to="/admin/companies">
               
                <li>Companies</li>
              </Link>
              <Link to="/admin/jobs">
               
                <li>Jobs</li>
              </Link>
                </>
              ):(
                <>
            <Link to="/">
               
                <li>Home</li>
              </Link>
              <Link to="/jobs">
               
                <li>Jobs</li>
              </Link>

              <Link to="/browse">
              
                <li>Browse</li>
              </Link>
              </>
              )
             }
            </ul>

            {!user ? (
              <div className="flex items-center gap-2 ">
                <Link to="/login">
                 
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-cyan-50 cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  
                  <Button
                    className="bg-purple-600 hover:bg-purple-600 cursor-pointer"
                    variant="outline"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-88">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">
                        {user?.fullName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col text-gray-600">
                    {
                      user && user.role==="student" && (
                       <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2/>
                      <Button variant="link"> <Link to="/profile">View Profile</Link> </Button>
                    </div> 
                      )
                    }
                    
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button className={"cursor-pointer"} onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
