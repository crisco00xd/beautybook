import styles from "./style";
import { Footer, Navbar, Contact, Book, BookLinker, SalonInfo, NavbarStylist, ViewAppointments } from "./components";
import { Home, Appointments, HomeOwner, Salon, Statistics, AppointmentsStylits, HomeStylist, StatisticsStylist, logInPage, SalonEdit, StylistsEdit } from "./Pages"
import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';

const App = () => (
	<div>
		<Router>
			<Routes> 
				<Route path="/" element={<Home/>}/>
				<Route path="/appointments" element={<Appointments/>}/>
				<Route path="/salon" element={<Salon/>}/>
				<Route path="/salonstylistsedit" element={<StylistsEdit/>}/>
				<Route path="/salonedit" element={<SalonEdit/>}/>
			</Routes>
		</Router>
		
{/* Home Owner*/}
		{/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
			<div className={`${styles.boxWidth}`}>
				<Navbar />
			</div>
		</div>

		<div className={`bg-white ${styles.flexStart}`}>
			<div className={`${styles.boxWidth}`}>
				<Book />
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
		
		<div className={`bg-white ${styles.flexStart}`}>
			<div className={`${styles.boxWidth}`}>
				<BookLinker />
			</div>
		</div>

		<div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
			<div className={`${styles.boxWidth}`}>
				<Footer />
			</div>
			
		</div> */}

	</div>
);

export default App;