import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import ConsumptionChart from "../components/ConsumptionChart";
export default function PredictDataUsage() {
  const { token } = useAuth();
  const [user_id, setUserId] = useState(null);
  const [result, setResult] = useState(null);
  const fetchUserDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/predict/${user_id}`,
        { user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data.message);
      return null;
    }
  };
  return (
    <div className="flex flex-col gap-8 h-screen max-w-screen-lg p-8">
      <div className="max-w-2xl space-y-4 ">
        <h1 className="font-semibold text-4xl text-gray-700">
          Predict Usage for Next Month
        </h1>
        <form id="predictForm " className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            {" "}
            <label htmlFor="user-id" className="font-semibold text-gray-500">
              Enter User ID:
            </label>
            <input
              type="number"
              id="user_id"
              name="user_id"
              value={user_id}
              className="border rounded-lg px-4 py-2"
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="bg-green-500 rounded-lg px-4 py-2 text-white transation duration-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={fetchUserDetails}
            >
              Predict Usage
            </button>
          </div>
        </form>
      </div>
      {result && (
        <div className="flex flex-row  gap-8">
          <ConsumptionChart used={result.predicted_usage} total={"100"} />

          <div className="flex flex-col gap-4 items-center  max-w-lg  bg-gray-100 rounded-lg p-8 shadow">
            <p className="font-bold text-4xl lightline-text">suggestion</p>
            <p className="text-gray-500 text-2xl ">{result.suggestion}</p>
            <p className="text-gray-500 text-sm ">{result.message}</p>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
}
