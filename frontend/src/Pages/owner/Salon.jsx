import React from 'react'
import styles from "../../style.js";
import { Footer, Navbar, Contact, Book, BookLinker, SalonInfo, NavbarStylist, ViewAppointments } from "../../components";
import { mySalonPic } from '../../assets/index.js';
import { Link } from 'react-router-dom';

const Salon = () => (
    <div className="bg-primary w-full overflow-hidden">
      
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <NavbarStylist />
          </div>
      </div>

      <div className={`bg-white flex items-start text`}>
          <img src = {mySalonPic} alt = 'mySalonPic'
            className = ' mt-10 mb-8 ml-14 w-[552px] h-[552px]' />

            <div>
              <h1 className="pt-20 pl-10 mt-40 ml-10 flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-stone-800 ss:leading-[100.8px] leading-[75px]">
                SALON NAME HERE <br className="sm:block hidden" />{" "}
              </h1>
            </div>

      </div>

      <div className='bg-white flex pl-14'>

        <Link to="/salonedit" className='mb-8 font-poppins font-semi text-[30px] text-stone-800 hover:bg-gray-100'>
            EDIT MY SALON
        </Link>
        
        <Link to="/stylistsedit" className='ml-6 font-poppins font-semi text-[30px] text-stone-800 hover:bg-gray-100'>
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

export default Salon