import styles from "../style";
import { useState } from 'react';
import { get_all_salon_by_owner } from "../queries";

const Contact = () => {

  const [startTime, setStartTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  //const descrpition = "[Sample:] At our beauty salon, we offer a wide range of services including haircuts, coloring, styling, facials, manicures, pedicures, and more. Our talented team of stylists and estheticians are trained in the latest techniques and use only the best products to ensure that you leave looking and feeling your best. Whether you are looking for a complete makeover or just a simple trim, our welcoming and comfortable atmosphere will make your visit a relaxing and enjoyable experience. Our salon is equipped with state-of-the-art equipment and features a modern, chic design that will make you feel like you are in a high-end spa. With flexible scheduling and affordable prices, we strive to make beauty accessible to everyone and help you look and feel your best. Book an appointment today and let us pamper you from head to toe!"


  const handleTest = async (event) => {

    const salonInfo = await get_all_salon_by_owner();
    setStartTime(salonInfo[0].startTime)
    setCloseTime(salonInfo[0].closeTime)
    setPhone(salonInfo[0].phone)
    setEmail(salonInfo[0].email)
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
    <div id="home" className={`flex md:flex-row flex-col sm:py-16 py-6 items-start`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-stone-800 ss:leading-[100.8px] leading-[75px]">
            CONTACT <br className="sm:block hidden" />{" "}
          </h1>

        </div>

        <p className={`${styles.paragraph} max-w-[470px] mt- text-stone-800`}>
          {phone}
          </p>

        <p className={`${styles.paragraph} max-w-[470px] mt- text-stone-800`}>
         {email}
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