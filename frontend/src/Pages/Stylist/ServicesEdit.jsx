import { NavbarStylist } from "../../components"
import styles from "../../style"
import { useState } from 'react';
import { Footer } from "../../components";

const ServicesEdit = () => {

  const [toggle, setToggle] = useState(false); // toggle state for navbar in mobile device

  const [stylistName, setStylistName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle login logic here
  };

  return (
    <div className="bg-primary w-full overflow-hidden">

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>

        <div className={`${styles.boxWidth}`}>
          <NavbarStylist />
        </div>

      </div>

      <div className="bg-white flex flex-col items-center">

          <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase mt-20'>
            stylists:
          </div>

          <div className='font-poppins text-black font-semibold text-lg uppercase mt-4'>
            {'[stylist name here]'}
          </div>

          <button className='font-poppins text-black font-semibold text-sm uppercase mt-4'
          onClick={() => setToggle((prev) => !prev)}>
            + Add new stylist
          </button>

          <div className={`${
            !toggle ? "hidden" : "flex"
          } mt-4`}>
          
          <div className="flex flex-col items-center sm:scale-100 scale-75">
            <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase sm:mt-20'>
              add new stylist
            </div>

            <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase mt-20'>
              Contact
            </div>

            <div className='font-poppins text-black font-semibold text-sm sm:text-lg uppercase mt-4'>
              {'(add information about your new stylist)'}
            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
                name
              </div>

              <input
              type="stylistName"
              name="stylistName"
              id="stylistName"
              value={stylistName}
              onChange={(event) => setStylistName(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8"
              required
            />

            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
                phone number
              </div>

              <input
              type="phone"
              name="phone"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8"
              required
            />

            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
                email
              </div>

              <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8"
              required
            />
            

            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold text-lg uppercase mt-8">
                password
              </div>

              <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8"
              required
            />
            

            </div>

            <div className='font-poppins text-black font-semibold text-4xl sm:text-5xl uppercase mt-20'>
              services
            </div>

            <div className='font-poppins text-black font-semibold text-lg uppercase mt-4'>
              {'(add information about your new stylist)'}
            </div>

            <div className="flex items-center">

              <div className="font-poppins text-black font-semibold sm:text-lg uppercase mt-8">
                service 1
              </div>

              <input
              type="service"
              name="service"
              id="service"
              value={service}
              onChange={(event) => setService(event.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md h-6 ml-2 mt-8 w-32 w- sm:w-48"
              required
            />

              <button className="flex justify-center">

                <div className="font-poppins text-black font-medium text-sm sm:text-base uppercase ml-4 mt-8">
                  + Add new service
                </div>

              </button>

            </div>

            <button className="flex justify-center items-center bg-black h-10 w-32 mt-8 mb-8">

                <div className="font-poppins text-white font-medium text-xl uppercase">
                  Add Stylist
                </div>

              </button>

          </div>
          
        </div>

      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>

        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>

      </div> 

    </div>
  )

}

export default ServicesEdit