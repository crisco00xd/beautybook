import styles from "./style";
import { Footer, Navbar, Contact, Book, BookLinker, SalonInfo, NavbarStylist, ViewAppointments } from "./components";
import { Appointments, HomeOwner, Salon, Statistics, AppointmentsStylits, HomeStylist, StatisticsStylist, SignIn, SignUp, SalonEdit, StylistsEdit, BeautyBook, ServicesEdit, SalonCreate } from "./Pages"
import { Home } from "./Pages"
import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';
import Salons from "./Pages/Salons";
import EditUser from "./Pages/owner/EditUser";

const App = () => (
	<div>
		<Router>
			<Routes> 

				<Route path="/" element={<BeautyBook/>}/> {/* Landing page route */}
				<Route path="/salons" element={<Salons/>}/> {/* Landing page route */}
				<Route path="/saloncreate" element={<SalonCreate/>}/> {/* Salon Creation Page route */}

				{/* Routes for sign in / sign up pages */}
				<Route path="/signin" element={<SignIn/>}/>
				<Route path="/signup" element={<SignUp/>}/>

				<Route path="/home" element={<Home/>}/>

				{/* Routes for owner user perspective */}
				<Route path="/home@" element={<HomeOwner/>}/>
				<Route path="/appointments" element={<Appointments/>}/>
				<Route path="/salon" element={<Salon/>}/>
				<Route path="/salonstylistsedit" element={<StylistsEdit/>}/>
				<Route path="/salonedit" element={<SalonEdit/>}/>
				<Route path="/statistics" element={<Statistics/>}/>
				<Route path="/edituser" element={<EditUser/>}/>
				

				{/* Routes for stylist user perspective */}
				<Route path="/stylistsedit" element={<StylistsEdit/>}/>
				<Route path="/home&" element={<HomeStylist/>}/>
				<Route path="/appointmentsstylist" element={<AppointmentsStylits/>}/>
				<Route path="/servicesedit" element={<ServicesEdit/>}/>
				<Route path="/statisticsstylist" element={<StatisticsStylist/>}/>

			</Routes>
		</Router>
	</div>
);

export default App;