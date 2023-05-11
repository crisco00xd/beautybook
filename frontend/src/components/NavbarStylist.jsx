import { useState, useEffect } from 'react';
import {close, menu, salonlogo, notificationsIcon} from '../assets';
import {navLinks, navLinksStylist} from '../constants';
import { signOut, getAllNotifications, getAllAppointments, getAllStylists, updateAppointmentStatus, get_all_salon_by_owner, signOut } from '../queries';
import {API_BASE_URL} from '../config';
import { useNavigate } from "react-router-dom";


const NavbarStylist = () => {

  const [toggle, setToggle] = useState(false); // toggle state for navbar in mobile devices
  const [toggle2, setToggle2] = useState(false); // toggle state for notification bar
  const [allNotifications, setAllNotifcations] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const navigate = useNavigate();
  const [salonName, setSalonName] = useState("");

  const handleTest = async (event) => {

    const salonInfo = await get_all_salon_by_owner();
    setSalonName(salonInfo[0].salon_name);
    console.log(salonInfo);
  };

  handleTest();

  const handleSignOut = async (event) => {
    event.preventDefault();
    // handle login logic here
    
    const response = await signOut()
    console.log(response);

    if(response.status === 200){
      alert("User signed out successfully");
      navigate("/saloncreate");
    }
    else{
      alert("Error Siging Out");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = parseInt(sessionStorage.getItem('id'));
        const stylists = await getAllStylists();
        const stylistId = stylists.filter(stylists => stylists.userID === userId)[0].stylistID;

        const notifications = await getAllNotifications();
        const appointments = await getAllAppointments();
 
        const myNotifications = notifications.filter(notifications => notifications.userID === userId && notifications.message === "New appointment request");
        const myAppointments = appointments.filter(appointments => appointments.stylistID === stylistId && appointments.status === "pending");

        setAllNotifcations(myNotifications);
        setAllAppointments(myAppointments);

      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  async function changeMessageAccepted(notificationId) {
    const updatedNotifications = allNotifications.map((notification) => {
      if (notification.notificationID === notificationId) {
        return {
          ...notification,
          message: "Accepted",
        };
      }
      return notification;
    });
    setAllNotifcations(updatedNotifications);
  
    const responseStatus = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Accepted" }),
    });
  }

  async function changeMessageCancelled (notificationId) {
    const updatedNotifications = allNotifications.map((notification) => {
      if (notification.notificationID === notificationId) {
        return {
          ...notification,
          message: "Cancelled",
        };
      }
      return notification;
    });
    setAllNotifcations(updatedNotifications);
  
    const responseStatus = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Cancelled" }),
    });
  }

  async function updateAppointmentDateTime (appointmentId) {
    const date = new Date('9999-12-31T00:00:00');
    const time = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ datetime: date.toISOString().replace(/\.000Z$/, '') }),
    });
  }

  return (
    // sets layout style for navbar section (using tailwind)

    /*here we are creating lists containing navbar buttons
    First list is for regular computer browser users
    Second list is for mobile browser users
    */

    <nav className = 'w-full flex py-6 justify-between items-center navbar'>
      
      <div className='font-poppins text-white font-lg'>
        {salonName}
      </div>

      <img src = {notificationsIcon} alt = 'samplesalon' // places logo on left hand side of navbar
      className = 'ml-4 w-[22px] h-[24px]' 
      onClick={() => setToggle2((prev) => !prev)}
      />

<div className={`${
            !toggle2 ? "hidden" : "flex"
          } p-6 bg-white absolute top-20 md:left-40 xl:left-96 mx-4 my-2 w-[300px] h-[400px] drop-shadow-2xl border-2 border-black`}
          style={{ zIndex: 9999}}
        >
          <div className='flex-col'>

            <div className='px-14 font-poppins text-bg font-black uppercase'>
              Notifications
            </div>

            {allNotifications.map((item, index) => {
              return(

                <>
                  <div key={index}>
                    <div className="mt-2 font-poppins text-bg uppercase text-xs font-bold">
                      {item.message}
                    </div>

                    <div className="flex mt-2">
                      <div className="font-poppins text-bg uppercase text-xs">
                          DATE: {allAppointments[index].datetime.slice(0, 10)}
                      </div>

                      <div className="ml-14 font-poppins text-bg uppercase text-xs">
                        TIME: {new Date(allAppointments[index].datetime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                      </div>
                    </div>

                    <div className="flex justify-center mt-2">
                      <button id={`accept-btn-${index}`} className="h-8 w-16 bg-black mt-2 font-poppins text-bg uppercase text-xs" onClick={() => {
                        updateAppointmentStatus(allAppointments[index].appointmentID, 'accepted');
                        changeMessageAccepted(item.notificationID)

                      } }>
                        <div className="font-poppins text-white">accept</div>
                      </button>

                      <button id={`deny-btn-${index}`} className="ml-4 h-8 w-16 bg-black mt-2 font-poppins text-bg uppercase text-xs" onClick={() => {
                        updateAppointmentStatus(allAppointments[index].appointmentID, 'cancelled');
                        updateAppointmentDateTime(allAppointments[index].appointmentID);
                        changeMessageCancelled(item.notificationID)
                        }}>
                        <div className="font-poppins text-white">deny</div>
                      </button>
                    </div>
                  </div>
                </>

              );

            })}

            

          </div>
          

        </div>

      <ul className = 'list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinksStylist.map((nav, index) => (
          <li
            key = {nav.id}
            className = {`font-poppins font.normal cursor-pointer text-[16px]} 
            ${index === navLinks.length - 1? 'mr-0' : 'mr-10'} text-white mr-10 `}
          
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
            {navLinksStylist.map((nav, index) => (
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
 
export default NavbarStylist 