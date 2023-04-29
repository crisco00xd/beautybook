import { useState } from 'react';
import {close, menu, notificationsIcon, beautyBookLogo} from '../assets';
import {navLinksBB} from '../constants';

const NavbarBB = () => {

  const [toggle, setToggle] = useState(false); // toggle state for navbar in mobile devices

  return (
    // sets layout style for navbar section (using tailwind)

    /*here we are creating lists containing navbar buttons
    First list is for regular computer browser users
    Second list is for mobile browser users
    */

    <nav className = 'w-full flex py-6 justify-between items-center navbar'>
      <img src = {beautyBookLogo} alt = 'samplesalon' // places logo on left hand side of navbar
      className = 'w-[80px] h-[32px]' />

      <ul className = 'list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinksBB.map((nav, index) => (
          <li
            key = {nav.id}
            className = {`font-poppins font.normal cursor-pointer text-[16px]} 
            ${index === navLinksBB.length - 1? 'mr-0' : 'mr-10'} text-white mr-10 `}
          
          > 

            <a href = {` ${nav.id}`}>
               {nav.title}
               </a>
   
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
            {navLinksBB.map((nav, index) => (
              <li
                key = {nav.id}
                className = {`font-poppins font.normal cursor-ponter text-[16px]} 
                ${index === navLinksBB.length - 1? 'mr-0' : 'mb-4'} text-white`}
              
              > 

                <a href = {` ${nav.id}`}>
                  {nav.title}
                  </a>
              </li>

            ))}

          </ul>

        </div>   
      </div>
    </nav>
  )
}
 
export default NavbarBB