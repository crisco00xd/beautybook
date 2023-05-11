import React, { useState, useEffect } from 'react'
import styles from "../../style.js";
import { Footer, Navbar, Contact, Book, BookLinker, SalonInfo, NavbarOwner, ViewAppointments } from "../../components";
import { Link } from 'react-router-dom';
import { get_all_stylist_by_owner, getUserById, getStylist } from "../../queries.jsx";
import { user } from '../../assets/index.js';

const Appointments = () => {
  const [stylist, setStylist] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await get_all_stylist_by_owner();

        const userIds = data.map(stylist => stylist.userID);

        const users = await Promise.all(userIds.map(id => getUserById(id)));

        const stylists = data.map((stylist, index) => ({
          id: stylist.stylistID,
          name: `${users[index].first_name} ${users[index].last_name}`,
        }));

        setStylist(stylists);
  
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-primary w-full overflow-hidden">

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
          </div>
      </div>

      <div className='bg-white flex pl-14'>

      {stylist.map((stylists) => (
          <div className="bg-white flex pl-14" key={stylists.id}>
            <Link to={`/Calendar?stylistId=${stylists.id}`} className="mb-8 font-poppins font-semi sm:text-[30px] text-[20px] text-stone-800">
              {stylists.name}
            </Link>
          </div>
        ))}
                    
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>

    </div>  
  )
}

export default Appointments
