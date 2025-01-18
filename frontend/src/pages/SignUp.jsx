import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const [registerform, setregisterform] = useState({
    username: "",
    phone_number: "",
    id: "",
    password: "",
  });
  const navigate = useNavigate();

  function HandleChange(event) {
    const { name, value } = event.target;
    setregisterform((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }

  async function RegisterForm(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        registerform
      );
      setLoading(false);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="relative flex justify-center items-center">
        <img src="./images/auth.jpg" className="w-full " alt="" />
        <div className="flex flex-col items-center justify-center gap-4 absolute w-full h-full ">
          <div>
            <p className="text-[36px] font-bold text-white">Espace client</p>
            <p className="text-3xl text-white">
              Accédez à toutes vos informations
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-lg mx-auto py-8 flex flex-col justify-center items-center gap-4">
        <p className="text-4xl text-[#001e8c] font-bold mb-8 uppercase">
          Inscription
        </p>
        <p className="text-2xl text-gray-600 ">créez votre compte personne</p>

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

        <button
          onClick={RegisterForm}
          className="mt-5 bg-[#64c832] border w-full font-bold text-white transition-all duration-500  rounded-xl px-4 py-3 shadow-sm hover:bg-white hover:text-[#001e8c]"
        >
          créez votre compte
        </button>
        <p className="text-[#001e8c] font-bold">vous avez deja un compte ? </p>
        <Link
          to="/"
          className="mt-5 bg-[#64c832] border font-bold text-white  rounded-xl px-4 py-2 shadow-sm transition-all duration-500  hover:bg-white hover:text-[#001e8c]"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
}
