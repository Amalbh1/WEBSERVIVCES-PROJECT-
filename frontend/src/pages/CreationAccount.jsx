import React from "react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
export default function CreationAccount() {
  const { token } = useAuth();
  const [registerform, setregisterform] = useState({
    username: "",
    phone_number: "",
    id: "",
    password: "",
    role: "",
  });

  function HandleChange(event) {
    const { name, value } = event.target;
    setregisterform((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }

  async function RegisterForm(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/register",
        registerform,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
  return (
    <div className="max-w-xl  p-8 flex flex-col justify-center items-center gap-4">
      <p className="text-4xl text-[#001e8c] font-bold mb-8 uppercase">
        Espace admin
      </p>
      <p className="text-2xl text-gray-600 ">créez un compte </p>

      <input
        onChange={HandleChange}
        type="text"
        name="username"
        placeholder="Username"
        className="w-full h-12 border border-[#001e8c] rounded-lg px-4 py-2"
      />
      <input
        onChange={HandleChange}
        type="text"
        name="phone_number"
        placeholder="phone number"
        className="w-full h-12 border border-[#001e8c] rounded-lg px-4 py-2"
      />
      <input
        onChange={HandleChange}
        type="text"
        name="id"
        placeholder="ID"
        className="w-full h-12 border border-[#001e8c] rounded-lg px-4 py-2"
      />
      <input
        onChange={HandleChange}
        type="password"
        name="password"
        placeholder="Password"
        className="w-full h-12 border border-[#001e8c] rounded-lg px-4 py-2"
      />
      <select
        onChange={HandleChange}
        name="role"
        className="w-full h-12 border border-[#001e8c] rounded-lg px-4 py-2"
      >
        <option value="" disabled selected>
          Role
        </option>
        <option value="admin">admin</option>
        <option value="user">user</option>
      </select>

      <button
        onClick={RegisterForm}
        className="mt-5 bg-[#64c832] border w-full font-bold text-white transition-all duration-500  rounded-xl px-4 py-3 shadow-sm hover:bg-white hover:text-[#001e8c]"
      >
        créez votre compte
      </button>
    </div>
  );
}
