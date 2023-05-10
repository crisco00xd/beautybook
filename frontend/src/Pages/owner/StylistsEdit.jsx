import { NavbarOwner } from "../../components"
import styles from "../../style"
import { useState } from 'react';
import { Footer } from "../../components";
import { get_all_stylist_by_owner, createUser, get_all_salon_by_owner, getUserById } from "../../queries";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StylistsEdit = () => {

  const [array2, setArray2] = useState([]);
  const [toggle, setToggle] = useState(false); // toggle state for navbar in mobile device
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
 
  useEffect(() => {
    const handleTest = async () => {
      const salonStylists = await get_all_stylist_by_owner();
      const array = await Promise.all(salonStylists.map(async (stylist) => {
        const user = await getUserById(stylist.userID);
        return user.first_name;
      }));
      setArray2(array);
    }
    handleTest();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handle sign up logic here
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const salonInfo = await get_all_salon_by_owner();

    const data = { 
      phone,
      roles: "stylist", //admin, stylist, owner
      first_name,
      last_name,
      email,
      password,
      is_superuser: false,
      admin: false,
      salonID: salonInfo[0].salonID
    };
    
    const response = await createUser(data);

    console.log(response);

    
    if(response.status === 200){
      alert("User created successfully");
      navigate("/salon");
    }
    else{
      alert("Error creating user");
    }
  };

  return (
    <div className="bg-primary w-full overflow-hidden">

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>

        <div className={`${styles.boxWidth}`}>
          <NavbarOwner />
        </div>

      </div>

      <div className="bg-white flex flex-col items-center">

        <div className='font-poppins text-black font-semibold text-lg uppercase mt-6'>
          new employees?
        </div>

        <div className='font-poppins text-black uppercase font-semibold text-lg'>
          someone left the team?
        </div>

        <div className='font-poppins text-black uppercase font-semibold text-lg'>
          add or remove stylists whenever!
        </div>

      </div>

      <div className="bg-white flex flex-col items-center">

          <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase mt-20'>
            stylists:
          </div>

          <div className="flex flex-col text-black items-center"> 
          
            {array2.map((name, index) => (
              <div key={index} className="p-1 mt-2 font-poppins text-lg font-semibold border-4 border-black w-28 text-center">
                {name}
              </div>
            ))}
          </div>

          <button className='font-poppins text-black font-semibold text-sm uppercase mt-4'
          onClick={() => setToggle((prev) => !prev)}>
            + Add new stylist
          </button>

          <div className={`${
            !toggle ? "hidden" : "flex"
          } mt-4`}>
          
          <div className="flex flex-col items-center sm:scale-100 scale-75">
            <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase sm:mt-20'>
              add new stylist
            </div>

            <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase mt-20'>
              Contact
            </div>

            <div className='font-poppins text-black font-semibold text-sm sm:text-lg uppercase mt-4'>
              {'(add information about your new stylist)'}
            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
                first name
              </div>

              <input
              type="stylistName"
              name="stylistName"
              id="stylistName"
              value={first_name}
              onChange={(event) => setFirstName(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8"
              required
            />

            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
                last name
              </div>

              <input
              type="stylistName"
              name="stylistName"
              id="stylistName"
              value={last_name}
              onChange={(event) => setLastName(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8"
              required
              />

            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
                phone number
              </div>

              <input
              type="phone"
              name="phone"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8"
              required
            />

            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
                email
              </div>

              <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8"
              required
            />
            

            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
                password
              </div>

              <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8"
              required
            />
            

            </div>

            <div className="flex items-center">

            <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
              confirm password
            </div>

            <input
            type="confirmpassword"
            name="confirmpassword"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8"
            required
            />


            </div>

            <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase mt-20'>
              services
            </div>

            <div className='font-poppins text-black font-semibold text-lg uppercase mt-4'>
              {'(add information about your new stylist)'}
            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold sm:text-lg uppercase mt-8">
                service 1
              </div>

              <input
              type="service"
              name="service"
              id="service"
              value={service}
              onChange={(event) => setService(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8 w-32 w- sm:w-48"
              required
            />

              <button className="flex justify-center">

                <div className="font-poppins text-black font-medium text-sm sm:text-base uppercase ml-4 mt-8">
                  + Add new service
                </div>

              </button>

            </div>

            <button className="flex justify-center items-center bg-black h-10 w-32 mt-8 mb-8"
            onClick={handleSubmit}>

                <div className="font-poppins text-white font-medium text-xl uppercase">
                  Add Stylist
                </div>

              </button>

          </div>
          
        </div>

      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>

        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>

      </div> 

    </div>
  )

}

export default StylistsEdit