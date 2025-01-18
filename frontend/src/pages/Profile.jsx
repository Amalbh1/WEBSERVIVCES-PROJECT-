import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
export default function Profile() {
  const { token, user, setUser } = useAuth();

  return (
    <div className="px-4 py-8 lg:py-12 lg:ps-20 w-full ">
      <h2 className="my-12 uppercase font-semibold text-1xl lg:text-xl ">
        Profile Details
      </h2>
      <div className="flex flex-row  gap-8 bg-gray-50 p-8 rounded-xl shadow relative overflow-hidden max-w-lg">
        <img
          className="w-32 h-32 rounded-full z-50"
          src="/images/profileAvatar.svg"
          alt=""
        />
        <img
          src="/logo-tt.svg"
          alt=""
          className="absolute top-0 right-0 w-full h-full blur-md opacity-50 z-0"
        />

        <div className="grid grid-cols-2 gap-4 z-50">
          <p className="font-semibold text-gray-500 text-lg ">ID:</p>{" "}
          <p className="font-semibold text-gray-700 text-lg capitalize ">
            {user.user_id}
          </p>
          <p className="font-semibold text-gray-500 text-lg ">Username:</p>{" "}
          <p className="font-semibold text-gray-700 text-lg capitalize ">
            {user.username}
          </p>
          <p className="font-semibold text-gray-500 text-lg text-nowrap">
            Phone Number:
          </p>{" "}
          <p className="font-semibold text-gray-700 text-lg capitalize ">
            {user.phone_number}
          </p>
          <p className="font-semibold text-gray-500 text-lg text-nowrap">
            Role:
          </p>{" "}
          <p className="font-semibold text-gray-700 text-lg capitalize ">
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}
