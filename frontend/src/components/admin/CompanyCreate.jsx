import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        console.log("Dispatching and showing success toast");
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      // Capture the entire error for debugging
      console.log("Full error:", error);

      // Provide feedback to the user with a fallback message
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <div>
          <div className="my-10">
            <h1 className="font-bold text-2xl">Your Company Name</h1>
            <p className="text-gray-500">
              Please Provide your Company Name, you can change this later{" "}
            </p>
          </div>

          <Label>Company Name</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="Google, Microsoft etc."
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div className="flex items-center gap-2 my-10">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="hover:bg-slate-200"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="bg-black text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
