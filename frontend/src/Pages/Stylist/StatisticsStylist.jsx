import { viewAppts } from "../../assets"
import { NavbarStylist, Footer } from "../../components"
import styles from "../../style"
import { getAppointmentsOfStylistByStatus, get_all_stylist_by_owner, getUserById, isAuthenticated } from "../../queries"
import { useEffect, useState } from "react"

const StatisticsStylist = () => {

  var approved = 0;
  var pending = 0;
  var cancelled = 0;
  var total = 0;

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleTest = async () => {

      const userID = await isAuthenticated();
      const user = await getUserById(userID.userID);
      const name = user.first_name;
      const approvedAppointments = await getAppointmentsOfStylistByStatus(userID.userID, "approved");
      approved = approvedAppointments.length;
      const pendingAppointments = await getAppointmentsOfStylistByStatus(userID.userID, "pending");
      pending = pendingAppointments.length;
      const cancelledAppointments = await getAppointmentsOfStylistByStatus(userID.userID, "cancelled");
      cancelled = cancelledAppointments.length;
      console.log(userID);
      console.log(name)
      total = approved + pending + cancelled;
      setUserName(name);
    }
    handleTest();
  }, []);

  return (
  <div className='w-full overflow-hidden'>

    <div className={`bg-black ${styles.paddingX} ${styles.flexCenter}`}>
			<div className={`${styles.boxWidth}`}>
				<NavbarStylist />
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

    <div className="flex justify-center items-center h-14 sm:w-32 w-56 border-4 border-black">
      <div className="font-poppins text-black font-medium text-lg">
        TOTAL
      </div>

    </div>

    </div>

    <div className="flex justify-center sm:scale-100 scale-75">

    <div className="flex justify-center items-center h-14 w-32 border-4 border-black">
      <div className="font-poppins text-black font-medium sm:text-lg">
        {userName}
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

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} mt-10`}>
			  <div className={`${styles.boxWidth}`}>
				<Footer />
			  </div>
			
		  </div>

  </div>
  )
}
export default StatisticsStylist