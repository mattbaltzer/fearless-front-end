import Nav from "./Nav.js";
import AttendeesList from "./AttendeesList.js";
import LocationForm from "./LocationForm.js";
import ConferenceForm from "./ConferenceForm.js";
import AttendeeForm from "./attend-conference.js";
import PresentationForm from "./PresentationForm.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App(props) {
	if (props.attendees === undefined) {
		return null;
	}
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="locations/new" element={<LocationForm />} />
					<Route
						path="conferences/new"
						element={<ConferenceForm />}
					/>
					<Route
						path="attendees"
						element={<AttendeesList attendees={props.attendees} />}
					/>
					<Route path="attendees/new" element={<AttendeeForm />} />
					<Route
						path="presentations/new"
						element={<PresentationForm />}
					/>
				</Routes>
				{/* <AttendeeForm /> */}
				{/* <ConferenceForm /> */}
				{/* <LocationForm /> */}
				{/* <AttendeesList attendees={props.attendees} /> */}
			</div>
		</BrowserRouter>
	);
}

export default App;
