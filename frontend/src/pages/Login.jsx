import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, setToken, backend_url } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
      let response = await axios.post(backend_url + "/api/user/register", {
          name,
          email,
          password,
        });
       if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Registration successful");
       }else{
          toast.error(response.data.message);
       }
      } else {
        let response = await axios.post(backend_url + "/api/user/login", {email,password});
        
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful");
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
    console.log(error);
        toast.error("An error occurred. Please try again later");
    }
  };
  useEffect(()=>{
     if(token){
      navigate("/");
     }
  },[token])
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-2 border bprder-gray-800"
          placeholder="Enter your name"
          required
        />
      )}
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-3 py-2 border bprder-gray-800"
        placeholder="Enter your email"
        required
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full px-3 py-2 border bprder-gray-800"
        placeholder="Enter password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign  Up"}
      </button>
    </form>
  );
};
export default Login;
