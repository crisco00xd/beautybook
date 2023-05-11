import React from 'react'
import styles from "../../style.js";
import { Footer, Navbar, ViewAppointmentsUser } from "../../components";
import SalonInfo from "./SalonInfo.jsx"
import Contact from "./Contact.jsx"

const Home = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
			<div className={`${styles.boxWidth}`}>
				<Navbar />
			</div>
		</div>

		<div className={`bg-white ${styles.flexStart}`}>
			<div className={`${styles.boxWidth}`}>
				<ViewAppointmentsUser />
			</div>
		</div>

		<div className={`bg-white ${styles.flexStart}`}>
			<div className={`${styles.boxWidth}`}>
				<SalonInfo />
			</div>
		</div>

		<div className={`bg-white ${styles.flexStart}`}>
			<div className={`${styles.boxWidth}`}>
				<Contact />
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

export default Home