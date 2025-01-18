import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Security() {
  const { token, user, setUser } = useAuth();
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    passwordConfirm: "",
  });
  function HandleChange(event) {
    const { name, value } = event.target;
    setForm((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const updateFields = {};

    if (form.new_password !== form.passwordConfirm) {
      toast.error("passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/change-password",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("account updated succesful");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  }
  return (
    <div className="px-4 py-8 lg:py-12 lg:ps-20 w-full max-w-lg">
      <h2 className="my-12 uppercase font-semibold text-1xl lg:text-xl ">
        Change Password
      </h2>
      <form className="grid gap-4 grid-cols-1 px-4">
        <label
          htmlFor="Password"
          className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <span className="text-xs font-medium text-gray-700">
            {" "}
            Old Password{" "}
          </span>

          <input
            type="password"
            id="old_password"
            onFocus={(e) => {
              e.target.placeholder = "";
            }}
            onBlur={(e) => (e.target.placeholder = "********")}
            name="old_password"
            onChange={HandleChange}
            placeholder="********"
            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <label
          htmlFor="new_password"
          className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <span className="text-xs font-medium text-gray-700">
            New Password{" "}
          </span>

          <input
            type="password"
            id="new_password"
            onFocus={(e) => {
              e.target.placeholder = "";
            }}
            onBlur={(e) => (e.target.placeholder = "********")}
            name="new_password"
            onChange={HandleChange}
            placeholder="********"
            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <label
          htmlFor="Confirm Password"
          className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <span className="text-xs font-medium text-gray-700">
            {" "}
            Confirm Password"{" "}
          </span>

          <input
            type="password"
            id="passwordConfirm"
            onFocus={(e) => {
              e.target.placeholder = "";
            }}
            onBlur={(e) => (e.target.placeholder = "********")}
            name="passwordConfirm"
            onChange={HandleChange}
            placeholder="********"
            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <button
          className="bg-green-500 px-4 py-2 rounded w-full text-white hover:bg-primary-600"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
