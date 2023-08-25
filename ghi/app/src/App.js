import Nav from "./Nav.js";
import AttendeesList from "./AttendeesList.js";
import LocationForm from "./LocationForm.js";
import ConferenceForm from "./ConferenceForm.js";
import AttendeeForm from "./attend-conference.js";
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
					<Route path="locations">
						<Route path="new" element={<LocationForm />} />
					</Route>
					<Route path="conferences">
						<Route path="new" element={<ConferenceForm />} />
					</Route>
					<Route path="attendees">
						<Route
							path=""
							element={
								<AttendeesList attendees={props.attendees} />
							}
						/>
					</Route>
					<Route path="attendees">
						<Route path="new" element={<AttendeeForm />} />
					</Route>
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
