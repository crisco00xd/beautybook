import React from 'react'
import styles from "../../style.js";
import ViewAppointments from './ViewAppointments.jsx';
import SalonInfo from './SalonInfo.jsx';
import { Footer, Navbar, Contact, Book, BookLinker, NavbarStylist } from "../../components";

const HomeStylist = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
			<div className={`${styles.boxWidth}`}>
				<NavbarStylist />
			</div>
		</div>

		<div className={`bg-white ${styles.flexStart}`}>
			<div className={`${styles.boxWidth}`}>
				<ViewAppointments />
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

export default HomeStylist