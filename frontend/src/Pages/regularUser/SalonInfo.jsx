import styles from "../../style";
import { user } from "../../assets";
import { useState } from "react";
import { getAllSalons, uploadImage } from "../../queries";

const SalonInfo = () => {

  const [salonName, setSalonName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {

    const index = parseInt(sessionStorage.getItem("salonID"));
    const response = await getAllSalons();
    setSalonName(response[index].salon_name);
    setDescription(response[index].description);
    
  };

  handleSubmit();
    return (

    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-stone-800 ss:leading-[100.8px] leading-[75px] uppercase">
            WELCOME TO {salonName} <br className="sm:block hidden" />{" "}
          </h1>

         
        </div>

        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-stone-800`}>
        {description}
        </p>
      </div>

      
      
      
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={user} alt="billing" className="w-[70%] h-[70%] relative z-[5]" />
      
      </div>

      
    </section>

    

    
  );
};

export default SalonInfo;