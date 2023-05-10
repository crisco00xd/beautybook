import styles from "../../style";
import { useState } from 'react';
import { getAllSalons, getSalon } from "../../queries";

const Contact = () => {

  const [startTime, setStartTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const handleSubmit = async (event) => {

    const index = parseInt(sessionStorage.getItem("salonID"));
    const response = await getAllSalons();
    setStartTime(response[index].startTime);
    setCloseTime(response[index].closeTime);
  };

  handleSubmit();

  return (
    <div id="home" className={`flex md:flex-row flex-col sm:py-16 py-6 items-start`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-stone-800 ss:leading-[100.8px] leading-[75px]">
            CONTACT <br className="sm:block hidden" />{" "}
          </h1>

        </div>

        <p className={`${styles.paragraph} max-w-[470px] mt- text-stone-800`}>
          {"phone"}
          </p>

        <p className={`${styles.paragraph} max-w-[470px] mt- text-stone-800`}>
         {"email"}
        </p>
            
      </div>

      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-stone-800 ss:leading-[100.8px] leading-[75px]">
            HOURS <br className="sm:block hidden" />{" "}
          </h1>

        </div>

        <p className={`${styles.paragraph} max-w-[470px] mt- text-stone-800`}>
          Monday - Friday: {startTime} + {" "} + {closeTime} 
          </p>
            
      </div>

    </div>
 
  );
};

export default Contact;