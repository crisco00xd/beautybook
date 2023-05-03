import styles from "./style";
import { Footer, Navbar, Contact, Book, BookLinker, SalonInfo, NavbarStylist, ViewAppointments } from "./components";
import { Home, Appointments, HomeOwner, Salon, Statistics, AppointmentsStylits, HomeStylist, StatisticsStylist, SignIn, SignUp, SalonEdit, StylistsEdit, BeautyBook } from "./Pages"
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
				<Route path="/home" element={<Home/>}/>
				<Route path="/appointments" element={<Appointments/>}/>
				<Route path="/salon" element={<Salon/>}/>
				<Route path="/salonstylistsedit" element={<StylistsEdit/>}/>
				<Route path="/salonedit" element={<SalonEdit/>}/>
				<Route path="/signin" element={<SignIn/>}/>
				<Route path="/signup" element={<SignUp/>}/>
				<Route path="/statistics" element={<Statistics/>}/>
				<Route path="/" element={<BeautyBook/>}/>
				<Route path="/stylistsedit" element={<StylistsEdit/>}/>
			</Routes>
		</Router>
	</div>
);

export default App;