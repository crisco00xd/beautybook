import React from 'react'
import styles from "../../style.js";
import { Footer, Navbar, Contact, Book, BookLinker, SalonInfo, NavbarOwner, ViewAppointments } from "../../components";
import { mySalonPic } from '../../assets/index.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { get_all_salon_by_owner } from '../../queries.jsx';

const Salon = () => {

  const [salonName, setSalonName] = useState("");
  //const descrpition = "[Sample:] At our beauty salon, we offer a wide range of services including haircuts, coloring, styling, facials, manicures, pedicures, and more. Our talented team of stylists and estheticians are trained in the latest techniques and use only the best products to ensure that you leave looking and feeling your best. Whether you are looking for a complete makeover or just a simple trim, our welcoming and comfortable atmosphere will make your visit a relaxing and enjoyable experience. Our salon is equipped with state-of-the-art equipment and features a modern, chic design that will make you feel like you are in a high-end spa. With flexible scheduling and affordable prices, we strive to make beauty accessible to everyone and help you look and feel your best. Book an appointment today and let us pamper you from head to toe!"


  const handleTest = async (event) => {

    const salonInfo = await get_all_salon_by_owner();
    setSalonName(salonInfo[0].salon_name);
    console.log(salonInfo);

    // if(test.message === "Salon updated") {
    //   navigate("/home@")
    // }
    // else {
    //   alert("An error has ocurred")
    // }
  };

  handleTest();

  return (
    
    <div className="bg-primary w-full overflow-hidden">
      
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <NavbarOwner />
          </div>
      </div>

      <div className={`bg-white flex justify-center sm:items-start items-center`}>
          <img src = {mySalonPic} alt = 'mySalonPic'
            className = 'mt-10 mb-8 sm:ml-4 sm:w-[552px] sm:h-[552px] w-[150px] h-[150px]' />

            <div className='flex flex-col items-center'>

              <div className="sm:pt-20 sm:pl-10 sm:mt-40 sm:ml-10 ml-6 flex-1 font-poppins font-semibold sm:text-[72px] text-[30px] text-stone-800 sm:leading-[100.8px]">
                {salonName}
              </div>

              <Link to="/salonedit" className='font-poppins font-semi sm:text-[30px] text-sm text-stone-800 hover:bg-gray-100'>
                EDIT SALON
              </Link>

            </div>
              

      </div>

      <div className='bg-white flex sm:pl-56'>

        <Link to="/edituser" className='mb-8 sm:ml-2 ml-4 font-poppins font-semi sm:text-[30px] text-sm text-stone-800 hover:bg-gray-100'>
            EDIT USER
        </Link>
        
        <Link to="/stylistsedit" className='sm:ml-6 ml-4 font-poppins font-semi sm:text-[30px] text-sm text-stone-800 hover:bg-gray-100'>
            ADD/REMOVE STYLISTS
        </Link>
                    
      </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
          
        </div>

    </div>
  )
}

export default Salon