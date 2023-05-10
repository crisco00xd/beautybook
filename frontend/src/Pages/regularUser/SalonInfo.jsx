import styles from "../../style";
import { user } from "../../assets";
import { useState } from "react";
import { get_all_salon_by_owner } from "../../queries";
import AppContext from '../../AppContext';
import { useContext } from 'react';

const SalonInfo = () => {

  const [salonName, setSalonName] = useState("");
  // const { array2 } = useContext(AppContext);
 
  // const handleTest = async (event) => {

  //   const salonInfo = await get_all_salon_by_owner();
  //   setSalonName(salonInfo[0].salon_name);
  //   console.log(salonInfo);
  // };

  // handleTest();

    return (

    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-stone-800 ss:leading-[100.8px] leading-[75px]">
            WELCOME TO {salonName} <br className="sm:block hidden" />{" "}
          </h1>

         
        </div>

        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-stone-800`}>
        {"descrpition"}
        </p>
      </div>

      
      
      
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={user} alt="billing" className="w-[70%] h-[70%] relative z-[5]" />
      
      </div>

      
    </section>

    

    
  );
};

export default SalonInfo;