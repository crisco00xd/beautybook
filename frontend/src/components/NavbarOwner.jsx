import { useState } from 'react';
import {close, menu, salonlogo, notificationsIcon} from '../assets';
import {navLinks, navLinksOwner} from '../constants';
import { signOut } from '../queries';
import { useNavigate } from "react-router-dom";

const NavbarOwner = () => {

  const [toggle, setToggle] = useState(false); // toggle state for navbar in mobile devices
  const [toggle2, setToggle2] = useState(false); // toggle state for notification bar
  const navigate = useNavigate();

  const handleSignOut = async (event) => {
    event.preventDefault();
    // handle login logic here

    const response = await signOut()
    console.log(response);

    if(response.status === 200){
      alert("User signed out successfully");
    }
    else{
      alert("Error Signing Out in");
      navigate("/signin")
    }
  };

  return (
    // sets layout style for navbar section (using tailwind)

    /*here we are creating lists containing navbar buttons
    First list is for regular computer browser users
    Second list is for mobile browser users
    */

    <nav className = 'w-full flex py-6 justify-between items-center navbar'>
      <img src = {salonlogo} alt = 'samplesalon' // places logo on left hand side of navbar
      className = 'w-[124px] h-[32px]' />

      <img src = {notificationsIcon} alt = 'samplesalon' // places logo on left hand side of navbar
      className = 'ml-4 w-[22px] h-[24px]' 
      onClick={() => setToggle2((prev) => !prev)}
      />

      <div className={`${
            !toggle2 ? "hidden" : "flex"
          } p-6 bg-white absolute top-20 md:left-40 xl:left-96 mx-4 my-2 w-[300px] h-[400px] drop-shadow-2xl border-2 border-black`}
        >
          <div className='flex-col'>

            <div className='px-14 font-poppins text-bg font-black uppercase'>
              Notifications
            </div>

            <div className='mt-6 font-poppins text-bg uppercase text-xs'>
              MM/DD/YY HH:MM:SS
            </div>

            <div className='mt-2 font-poppins text-bg uppercase text-xs font-bold'>
              {'[USER]'} Has requested an appointment with {'[STYLIST NAME]'} for {'[SERVICES]'}
            </div>
            
            <div className='flex mt-2'>

              <div className='font-poppins text-bg uppercase text-xs'>
                When MM/DD/YY
              </div>

              <div className='ml-14 font-poppins text-bg uppercase text-xs'>
                TIME: HH:MM:SS
              </div>

            </div>
            
            <div className='flex justify-center mt-2'>

              <button className='h-8 w-16 bg-black mt-2 font-poppins text-bg uppercase text-xs'>
                
                <div className='font-poppins text-white'>
                  accept
                </div>

              </button>

              <button className='ml-4 h-8 w-16 bg-black mt-2 font-poppins text-bg uppercase text-xs'>
                
                <div className='font-poppins text-white'>
                  deny
                </div>

              </button>

            </div>

          </div>
          

        </div>

        <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
          {navLinksOwner.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font.normal cursor-pointer text-[16px]} 
            ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-white mr-10 `}
          >

          {nav.title === 'Sign Out' ? (
            <button onClick={handleSignOut}>{nav.title}</button>
          ) : (
          <a href={`${nav.id}`}>{nav.title}</a>
          )}
          </li>
          ))}
      </ul>


      
      <div className = "sm:hidden flex flex-1 justify-end items-center"> 
          <img 
          src = {toggle ? close: menu} 
          alt = 'menu'
          className='w-[28px] h-[28px] object-contain'
          onClick={() => setToggle((prev) => !prev)}
          
          />

       <div className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
        
            <ul className = 'list-none flex flex-col justify-end items-center flex-1'>
            {navLinksOwner.map((nav, index) => (
              <li
                key = {nav.id}
                className = {`font-poppins font.normal cursor-ponter text-[16px]} 
                ${index === navLinks.length - 1? 'mr-0' : 'mb-4'} text-white`}
              
              > 

                {nav.title === 'Sign Out' ? (
                <button onClick={handleSignOut}>{nav.title}</button>
                ) : (
                <a href={`${nav.id}`}>{nav.title}</a>
                )}

              </li>

            ))}

          </ul>

        </div>   
      </div>
    </nav>
  )
}
 
export default NavbarOwner 