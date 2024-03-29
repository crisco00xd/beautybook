import { beautyBookLogo } from "../assets"
import NavbarBB from "../components/NavbarBB"
import styles from "../style"
import { getAllSalons, getSalon } from "../queries";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BeautyBook = () => {

    const navigate = useNavigate();
    const [salonName, setSalonName] = useState([]);
    const [array2, setArray2] = useState([]);

    const handleIndex = (index) => {

        sessionStorage.setItem("salonID", index);
        navigate("/home");

      }

    useEffect(() => {
        const handleTest = async () => {
          const allSalons = await getAllSalons();
          const salons = await Promise.all(allSalons.map(async (salon) => {
            const user = await getSalon(salon.salonID);
            return user.salonID;
          }));
          setArray2(salons);

          const names = await Promise.all(allSalons.map(async (salon) => {
            const user = await getSalon(salon.salonID);
            return user.salon_name;
          }));
          setSalonName(names);
        }
        handleTest();
      }, []);


    return (

        <div className="w-full overflow-hidden">

        <div className={`${styles.paddingX} ${styles.flexCenter} bg-black`}>
            <div className={`${styles.boxWidth}`}>
                <NavbarBB />
            </div>
        </div>

        <div className="flex justify-center sm:px-0 px-4">
            <div className="font-poppins text-black text-6xl font-bold mt-16 uppercase">
                Welcome to Beauty Book
            </div>

        </div>

        <div className="flex justify-center sm:px-0 px-4">

            <div className="font-poppins text-black text-xl font-semibold mt-4 sm:mb-8">
                THE BOOKING APP YOUR SALON DESERVES!
            </div>

        </div>

        <div className="flex" id="about-us-section">
            <p className="font-poppins text-black text-xl font-semibold scale-75 sm:text-center">
            Beauty Book is the ultimate online booking platform for beauty salons! Our website offers a simple and easy-to-use interface for salons to manage their appointments and for clients to book their next beauty treatment.
            On Beauty Book, salons can create their own profiles, set their availability, and list their services and prices. Clients can then search for salons in their area and book appointments directly through the website. 
            Our platform also offers convenient features such as appointment reminders and the ability to leave reviews and ratings.
            With our reliable and user-friendly platform, booking your next beauty appointment has never been easier. Sign up today and experience the convenience of Beauty Book!  
            </p>
        </div>

            <div className="flex justify-center">

                <div className="font-poppins text-black text-5xl font-bold mt-16 uppercase">
                    Salons
                </div>

            </div>

            <div className="flex justify-center mt-8 sm:scale-100 scale-75">

                <div className="grid grid-cols-3 gap-4">
                    {salonName.map((name, index) => (

                    <div key={array2[index]} className="flex justify-center sm:scale-100 scale-75">

                        <button to="/home" 
                        className='flex items-center justify-center h-72 w-72 bg-black ml-4 mb-8 hover:bg-gray-400'
                        onClick={() => {
                            handleIndex(index)}
                        }>
                            <div className="font-poppins text-white text-3xl font-bold uppercase">
                                {name}
                            </div>
                        </button>

                    </div>

                    ))}
                </div>

            </div>
            
        </div>
        
  )
}
export default BeautyBook