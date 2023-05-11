import { viewAppts } from "../../assets"
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
  var finished = 0;
  var total = 0;

  const [stylistsData, setStylistsData] = useState([]);

  useEffect(() => {
    const handleTest = async () => {
      const salonStylists = await get_all_stylist_by_owner();
      const array = await Promise.all(salonStylists.map(async (stylist) => {
        const user = await getUserById(stylist.userID);
        const approvedAppointments = await getAppointmentsOfStylistByStatus(stylist.stylistID, "approved");
        const pendingAppointments = await getAppointmentsOfStylistByStatus(stylist.stylistID, "pending");
        const cancelledAppointments = await getAppointmentsOfStylistByStatus(stylist.stylistID, "cancelled");
        const finishedAppointments = await getAppointmentsOfStylistByStatus(stylist.stylistID, "finished");
        return {
          name: user.first_name,
          approved: approvedAppointments.length,
          pending: pendingAppointments.length,
          cancelled: cancelledAppointments.length,
          finished: finishedAppointments.length,
          total: approvedAppointments.length + pendingAppointments.length + cancelledAppointments.length + finishedAppointments.length
        };
      }));
      setStylistsData(array);
    };
    handleTest();
  }, []);

  return (
    <div className='w-full overflow-hidden'>

      <div className={`bg-black ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <NavbarOwner />
        </div>
      </div>

      <img src = {viewAppts} alt = 'viewAppts'
        className = 'sm:mt-16 mt-6 mb-6 w-full h-auto' />

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

          <div className="flex justify-center items-center h-14 sm:w-32 w-20 border-4 border-black">
            <div className="font-poppins text-black font-medium text-xs text-center sm:scale-100 scale-75">
              FINISHED APPOINTMENTS
            </div>
          </div>

          <div className="flex justify-center items-center h-14 sm:w-32 w-56 border-4 border-black">
            <div className="font-poppins text-black font-medium text-lg">
              TOTAL
            </div>

          </div>

        </div>

        <div className="flex flex-col"> 
          
        {stylistsData.map((stylist, index) => (
            

            <div className="flex justify-center sm:scale-100 scale-75">

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div key={index} className="font-poppins text-black font-medium sm:text-lg">
                  {stylist.name}
                </div>
              </div>

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div className="font-poppins text-black font-medium sm:text-lg">
                  {stylist.approved}
                </div>
              </div>

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div className="font-poppins text-black font-medium sm:text-lg">
                  {stylist.cancelled}
                </div>
              </div>

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div className="font-poppins text-black font-medium sm:text-lg">
                  {stylist.pending}
                </div>
              </div>

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div className="font-poppins text-black font-medium sm:text-lg">
                  {stylist.finished}
                </div>
              </div>

              <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
                <div className="font-poppins text-black font-medium sm:text-lg">
                  {stylist.total}
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