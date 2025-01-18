import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
export default function SignIn() {
  const { loginAction } = useAuth();
  const [logform, setlogform] = useState({
    username: "",
    password: "",
  });
  function HandleChange(event) {
    const { name, value } = event.target;
    setlogform((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (logform.username !== "" && logform.password !== "") {
      loginAction(logform);
      return;
    }
    toast.error("pleae provide a valid input");
  };
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
        <p className="text-4xl text-[#001e8c] font-bold">Authentification</p>

        <input
          onChange={HandleChange}
          type="text"
          name="username"
          placeholder="Username"
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
          onClick={handleSubmitEvent}
          className="mt-5 bg-[#64c832] border w-full font-bold text-white transition-all duration-500  rounded-xl px-4 py-3 shadow-sm hover:bg-white hover:text-[#001e8c]"
        >
          Connexion
        </button>
        <p className="text-[#001e8c] font-bold">Vous n'avez pas de compte ? </p>
        <Link
          to="/signup"
          className="mt-5 bg-[#64c832] border font-bold text-white  rounded-xl px-4 py-2 shadow-sm transition-all duration-500  hover:bg-white hover:text-[#001e8c]"
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
}
