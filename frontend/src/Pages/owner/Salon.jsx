import React from 'react'
import styles from "../../style.js";
import { Footer, Navbar, Contact, Book, BookLinker, SalonInfo, NavbarOwner, ViewAppointments } from "../../components";
import { mySalonPic } from '../../assets/index.js';
import { Link } from 'react-router-dom';

const Salon = () => {

  var salonName = "[Salon Name Here]"

  return (
    
    <div className="bg-primary w-full overflow-hidden">
      
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <NavbarOwner />
          </div>
      </div>

      <div className={`bg-white flex justify-center sm:items-start items-center`}>
          <img src = {mySalonPic} alt = 'mySalonPic'
            className = 'mt-10 mb-8 ml-14 sm:w-[552px] sm:h-[552px] w-[150px] h-[150px]' />

              <div className="sm:pt-20 sm:pl-10 sm:mt-40 ml-10 flex-1 font-poppins font-semibold sm:text-[72px] text-[30px] text-stone-800 sm:leading-[100.8px]">
                {salonName}
              </div>

      </div>

      <div className='bg-white flex pl-14'>

        <Link to="/salonedit" className='mb-8 font-poppins font-semi sm:text-[30px] text-[20px] text-stone-800 hover:bg-gray-100'>
            EDIT MY SALON
        </Link>
        
        <Link to="/stylistsedit" className='sm:ml-6 font-poppins font-semi sm:text-[30px] text-[20px] text-stone-800 hover:bg-gray-100'>
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