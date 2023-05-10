import { statsImage } from "../../assets"
import { NavbarOwner, Footer } from "../../components"
import styles from "../../style"
import { useState } from "react"
import { getAppointmentsOfStylistByStatus, get_all_stylist_by_owner, getUserById } from "../../queries"
import { useEffect } from "react"

const Statistics = () => { 

  const [array2, setArray2] = useState([]);

  var approved = 0;
  var pending = 0;
  var cancelled = 0;
  var total = 0;

  useEffect(() => {
    const handleTest = async () => {
      const salonStylists = await get_all_stylist_by_owner();
      const array = await Promise.all(salonStylists.map(async (stylist) => {
        const user = await getUserById(stylist.userID);
        const approvedAppointments = await getAppointmentsOfStylistByStatus(stylist.userID, "approved");
        approved = approvedAppointments.length;
        const pendingAppointments = await getAppointmentsOfStylistByStatus(stylist.userID, "pending");
        pending = pendingAppointments.length;
        const cancelledAppointments = await getAppointmentsOfStylistByStatus(stylist.userID, "cancelled");
        cancelled = cancelledAppointments.length;
        return user.first_name;
      }));
      setArray2(array);
      total = approved + pending + cancelled;
    }
    handleTest();
  }, []);
  
  console.log(approved);
  console.log(pending);
  console.log(cancelled);

  return (
    <div className='w-full overflow-hidden'>

      <div className={`bg-black ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <NavbarOwner />
        </div>
      </div>

      <img src = {statsImage} alt = 'viewAppts'
        className = 'sm:mt-16 mt-6 mb-6 w-full h-auto' />

        <div className="mt-10 flex justify-center sm:scale-100 scale-50">

          <button className="flex justify-center items-center bg-black h-14 w-32">
            <div className="font-poppins text-white font-medium text-xl">
              ALL TIME
            </div>
          </button>

          <button className="flex justify-center items-center h-14 w-32 border-4 border-black">
            <div className="font-poppins text-black font-medium text-lg">
              THIS MONTH
            </div>
          </button>

          <button className="flex justify-center items-center h-14 w-40 ml-6">
            <div className="font-poppins text-black font-medium text-base hover:text-gray-500">
              CUSTOM TIMELINE
            </div>
          </button> 

        </div>

        <div className="mt-10 flex justify-center sm:scale-100 scale-75">

          <div className="flex justify-center items-center h-14 sm:w-32 w-44 border-4 border-black">
            <div className="font-poppins text-black font-medium sm:text-lg sm:scale-100 scale-75">
              STYLIST
            </div>
          </div>

          <div className="flex justify-center items-center h-14 sm:w-32 w-20 border-4 border-black">
            <div className="font-poppins text-black font-medium text-xs text-center sm:scale-100 scale-75">
              ACCEPTED APPOINTMENTS
            </div>
          </div>

          <div className="flex justify-center items-center h-14 sm:w-32 w-20 border-4 border-black">
            <div className="font-poppins text-black font-medium text-xs text-center sm:scale-100 scale-50">
              CANCELED APPOINTMENTS
            </div>
          </div>

          <div className="flex justify-center items-center h-14 sm:w-32 w-20 border-4 border-black">
            <div className="font-poppins text-black font-medium text-xs text-center sm:scale-100 scale-75">
              PENDING APPOINTMENTS
            </div>
          </div>

          <div className="flex justify-center items-center h-14 sm:w-32 w-56 border-4 border-black">
            <div className="font-poppins text-black font-medium text-lg">
              TOTAL
            </div>

          </div>

        </div>

        <div className="flex flex-col"> 
          
          {array2.map((name, index) => (
            

            <div className="flex justify-center sm:scale-100 scale-75">

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div key={index} className="font-poppins text-black font-medium sm:text-lg">
                  {name}
                </div>
              </div>

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div className="font-poppins text-black font-medium sm:text-lg">
                  {approved}
                </div>
              </div>

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div className="font-poppins text-black font-medium sm:text-lg">
                  {pending}
                </div>
              </div>

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div className="font-poppins text-black font-medium sm:text-lg">
                  {cancelled}
                </div>
              </div>

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div className="font-poppins text-black font-medium sm:text-lg">
                  {total}
                </div>
              </div>

            </div>

          ))}

        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} mt-10`}>
          <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
        
        </div>

    </div>
  )
}
export default Statistics