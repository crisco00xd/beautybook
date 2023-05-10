import React, { useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { createUser } from "../queries";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [showHours, setShowHours] = useState(false);
  const [showMinutes, setShowMinutes] = useState(false);
  const [showAMOrPM, setShowAMOrPM] = useState(false);
  const [showHours2, setShowHours2] = useState(false);
  const [showMinutes2, setShowMinutes2] = useState(false);
  const [showAMOrPM2, setShowAMOrPM2] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedStartMinute, setSelectedStartMinute] = useState("");
  const [selectedAMOrPm, setSelectedAMOrPM] = useState("");
  const [selectedClosingTime, setSelectedClosingTime] = useState("");
  const [selectedClosingMinute, setSelectedClosingMinute] = useState("");
  const [selectedAMOrPm2, setSelectedAMOrPM2] = useState("");

  const hours = ["01", "02", "03", "04", "05", "06", "07", "08","09", "10", "11", "12"];
  const minute = ["00","5", "10", "15", "20", "25", "30", "35", "40","45", "50", "55"];
  const amOrPm = ["AM","PM"];
  const startTime = selectedStartTime + ":"+ selectedStartMinute + ":" + "00";

  const hours2 = ["01", "02", "03", "04", "05", "06", "07", "08","09", "10", "11", "12"];
  const minute2 = ["00","5", "10", "15", "20", "25", "30", "35", "40","45", "50", "55"];
  const amOrPm2 = ["AM","PM"];
  const closeTime = selectedClosingTime + ":"+ selectedClosingMinute + ":" + "00";

  const handleHourSelection = (hours) => {
    setSelectedStartTime(hours);
    setShowHours(false);
  };

  const handleMinuteSelection = (minute) => {
    setSelectedStartMinute(minute);
    setShowMinutes(false);
  };

  const handleAMPMSelection = (amOrPm) => {
    setSelectedAMOrPM(amOrPm);
    setShowAMOrPM(false);
  };

  const handleHourSelection2 = (hours2) => {
    setSelectedClosingTime(hours2);
    setShowHours2(false);
  };

  const handleMinuteSelection2 = (minute2) => {
    setSelectedClosingMinute(minute2);
    setShowMinutes2(false);
  };

  const handleAMPMSelection2 = (amOrPm2) => {
    setSelectedAMOrPM2(amOrPm2);
    setShowAMOrPM2(false);
  };

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
      salon_name: salon,
      is_superuser: false,
      admin: true,
      startTime,
      closeTime,
    };
    
    const response = await createUser(data)

    console.log(response);

    
    if(response.status === 200){
      alert("User created successfully");
      navigate("/saloncreate");
    }
  };

  return (
    <div className="flex h-screen bg-white sm:scale-100 scale-75">

      <div className="m-auto w-96">

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign up</h1>
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
          <div className="mb-4">
            <label htmlFor="salon" className="block text-gray-700 font-bold mb-2">
              Salon Name
            </label>
            <input
              type="salon"
              name="salon"
              id="salon"
              value={salon}
              onChange={(event) => setSalonName(event.target.value)}
              className="border-2 border-gray-300 p-2 w-full rounded-md"
              required
            />
          </div>

          <div className="flex flex-row">

          </div>

        </form>

        <div className="mb-4">

        <label htmlFor="salon" className="block text-gray-700 font-bold mb-2">
          Choose Opening Hours:
        </label>

        {/* Opening Time selector for salon creation*/}
        <button
          className="border-2 border-gray-300 p-2 rounded-md w-14 h-14 ml-4 text-xs"
          onClick={() => setShowHours(!showHours)}
        >
          {selectedStartTime ? `${selectedStartTime}` : "Select Hour"}
        </button>

        {showHours && (

            <div className="bg-white w-24 py-2 rounded-md shadow-md">
            {hours.map((hours) => (
              <div
                key={hours}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleHourSelection(hours)}
              >
                {hours}
              </div>
            ))}
            </div>         

        )}

        <button
          className="border-2 border-gray-300 p-2 rounded-md ml-4 w-14 h-14 text-xs"
          onClick={() => setShowMinutes(!showMinutes)}
        >
          {selectedStartMinute ? `${selectedStartMinute}` : "Select Minute"}
        </button>

        {showMinutes && (

            <div className="bg-white w-24 py-2 rounded-md shadow-md">
            {minute.map((minute) => (
              <div
                key={minute}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleMinuteSelection(minute)}
              >
                {minute}
              </div>
            ))}
            </div>         

        )}

        <button
          className="border-2 border-gray-300 p-2 w-14 h-14 rounded-md ml-4 text-xs"
          onClick={() => setShowAMOrPM(!showAMOrPM)}
        >
          {selectedAMOrPm ? `${selectedAMOrPm}` : "AM or PM"}
        </button>

        {showAMOrPM && (

            <div className="bg-white w-24 py-2 rounded-md shadow-md">
            {amOrPm.map((amOrPm) => (
              <div
                key={amOrPm}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAMPMSelection(amOrPm)}
              >
                {amOrPm}
              </div>
            ))}
            </div>         

        )}

        </div> {/*Opening Time selector finished here*/}


        <div className="mb-4">

        <label htmlFor="salon" className="block text-gray-700 font-bold mb-2">
          Choose Closing Hours:
        </label>

        {/* Closing Time selector for salon creation*/}
        <button
          className="border-2 border-gray-300 p-2 rounded-md w-14 h-14 ml-4 text-xs"
          onClick={() => setShowHours2(!showHours2)}
        >
          {selectedClosingTime ? `${selectedClosingTime}` : "Select Hour"}
        </button>

        {showHours2 && (

            <div className="bg-white w-24 py-2 rounded-md shadow-md">
            {hours2.map((hours2) => (
              <div
                key={hours2}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleHourSelection2(hours2)}
              >
                {hours2}
              </div>
            ))}
            </div>         

        )}

        <button
          className="border-2 border-gray-300 p-2 rounded-md ml-4 w-14 h-14 text-xs"
          onClick={() => setShowMinutes2(!showMinutes2)}
        >
          {selectedClosingMinute ? `${selectedClosingMinute}` : "Select Minute"}
        </button>

        {showMinutes2 && (

            <div className="bg-white w-24 py-2 rounded-md shadow-md">
            {minute2.map((minute2) => (
              <div
                key={minute2}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleMinuteSelection2(minute2)}
              >
                {minute2}
              </div>
            ))}
            </div>         

        )}

        <button
          className="border-2 border-gray-300 p-2 w-14 h-14 rounded-md ml-4 text-xs"
          onClick={() => setShowAMOrPM2(!showAMOrPM2)}
        >
          {selectedAMOrPm2 ? `${selectedAMOrPm2}` : "AM or PM"}
        </button>

        {showAMOrPM2 && (

            <div className="bg-white w-24 py-2 rounded-md shadow-md">
            {amOrPm2.map((amOrPm2) => (
              <div
                key={amOrPm2}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAMPMSelection2(amOrPm2)}
              >
                {amOrPm2}
              </div>
            ))}
            </div>         

        )}

        </div> {/*Closing Time selector finished here*/}

        <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Sign up
          </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:text-blue-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
