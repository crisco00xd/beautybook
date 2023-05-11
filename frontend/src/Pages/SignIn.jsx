import {isOwnerByUserId ,getAccessToken, isAuthenticated, signIn, getAllUsers, get_all_stylist_by_owner, get_all_salon_by_owner } from "../queries";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from 'react-router-dom'; 

let authenticated = false;

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handle login logic here

    const response = await signIn(email, password)
    console.log(response);
    // const appointment = await getStylistAppointment(1);
    // console.log(appointment);

    const users = await getAllUsers();
    const userId = users.filter(users => users.email === email)[0].userID;

    authenticated = await isAuthenticated();
    if (authenticated) {
      sessionStorage.setItem("id", userId);
    }

    authenticated = await isAuthenticated();
    const isOwner = await isOwnerByUserId(authenticated.userID);
    console.log(isOwner);
    console.log(authenticated.userID);
    // const stylist_byOwner = await get_all_stylist_by_owner();
    // console.log(stylist_byOwner);
    // const salon_byOwner = await get_all_salon_by_owner();
    // console.log(salon_byOwner);

    if(response.status === 200 && isOwner.is_owner === true){
      alert("User logged in successfully");
      navigate("/home@");
    }
    else if(response.status === 200 && isOwner.is_owner === false) {
      alert("User logged in successfully");
      navigate("/home&");
    }
    else{
      alert("Error logging in");
    }
  };

  return (
    <div className="flex h-screen bg-white sm:scale-100 scale-75">
      <div className="m-auto w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-2 border-gray-300 p-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border-2 border-gray-300 p-2 w-full rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
export { authenticated };
