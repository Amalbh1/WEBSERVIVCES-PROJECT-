import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import MonthlyConsumptionChart from "../components/MonthlyConsumptionChart ";
export default function UsageHistory() {
  const { token } = useAuth();
  const [history_id, setHistoryId] = useState("");
  const [monthlyUsage, setMonthlyUsage] = useState();
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/telecom-usage/${history_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMonthlyUsage(response.data);
    } catch (error) {
      toast.error(error.response?.data.msg);
    
      return null;
    }
  };


  return (
    <div className="px-4 py-8 max-w-7xl ">
      <h2 className="text-2xl font-semibold mb-4">User Usage History</h2>
      <div className="flex ">
        <div className="relative">
          <input
            type="text"
            onChange={(e) => setHistoryId(e.target.value)}
            value={history_id || ""}
            name="history_id"
            placeholder="Search users by ID"
            className="border border-gray-300 rounded-md px-3 pe-8 py-2 focus:outline-none focus:ring focus:ring-blue-500 ms-auto"
          />
          <svg
            className="absolute right-3 top-3 h-6 w-6 p-1 text-gray-400 rounded-lg cursor-pointer hover:bg-gray-100"
            viewBox="0 0 1024 1024"
            onClick={fetchUserDetails}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M492.5 917.7c-247 0-447.9-200.9-447.9-447.9s200.9-448 447.9-448 447.9 200.9 447.9 447.9-200.9 448-447.9 448z m0-810.6c-200 0-362.6 162.7-362.6 362.6s162.7 362.6 362.6 362.6 362.6-162.7 362.6-362.6-162.6-362.6-362.6-362.6z"
                fill="#3688FF"
              />
              <path
                d="M951.1 971c-10.9 0-21.8-4.2-30.2-12.5l-96-96c-16.7-16.7-16.7-43.7 0-60.3 16.6-16.7 43.7-16.7 60.3 0l96 96c16.7 16.7 16.7 43.7 0 60.3-8.2 8.4-19.2 12.5-30.1 12.5z"
                fill="#5F6379"
              />
            </g>
          </svg>
        </div>
      </div>

      {monthlyUsage && <MonthlyConsumptionChart data={monthlyUsage} />}
    </div>
  );
}
