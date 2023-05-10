import React, { useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../queries";
import { isAuthenticated } from "../../queries";

function EditUser() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [salon, setSalonName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // handle sign up logic here
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = { 
      phone,
      roles: "owner", //admin, stylist, owner
      first_name,
      last_name,
      email,
      password,
      is_superuser: false,
      admin: true,
    };
    
    const userID = await isAuthenticated();
    console.log(userID);
    const response = await updateUser(userID.userID, data);

    console.log(response);

    
    if(response.message === 'User updated'){
      alert("User updated successfully");
      navigate("/salon");
    }
  };

  return (
    <div className="flex h-screen bg-white sm:scale-100 scale-75">

      <div className="m-auto w-96">

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit User Information</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700 font-bold mb-2">
              First Name
            </label>
            <input
              type="first_name"
              name="first_name"
              id="first_name"
              value={first_name}
              onChange={(event) => setFirstName(event.target.value)}
              className="border-2 border-gray-300 p-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700 font-bold mb-2">
              Last Name
            </label>
            <input
              type="last_name"
              name="last_name"
              id="last_name"
              value={last_name}
              onChange={(event) => setLastName(event.target.value)}
              className="border-2 border-gray-300 p-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
              Phone Number
            </label>
            <input
              type="phone"
              name="phone"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="border-2 border-gray-300 p-2 w-full rounded-md"
              required
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="border-2 border-gray-300 p-2 w-full rounded-md"
              required
            />
          </div>

          <div className="flex flex-row">

          </div>

        </form>

        <button
            type="savechanges"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Save Changes
          </button>

      </div>

    </div>
  );
}

export default EditUser;
