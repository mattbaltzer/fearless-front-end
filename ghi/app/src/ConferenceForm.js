import React, { useEffect, useState } from "react";

function ConferenceForm() {
	const [locations, setLocations] = useState([]);
	const [name, setName] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [description, setDescription] = useState("");
	const [maxPresents, setMaxPresents] = useState(0);
	const [maxAttendees, setMaxAttendees] = useState(0);
	const [location, setLocation] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.name = name;
		data.starts = startDate;
		data.ends = endDate;
		data.description = description;
		data.max_presentations = maxPresents;
		data.max_attendees = maxAttendees;
		data.location = location;
		console.log(data);

		const conferenceUrl = "http://localhost:8000/api/conferences/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(conferenceUrl, fetchConfig);
		if (response.ok) {
			const newConference = await response.json();
			console.log(newConference);

			setName(""); // changes the value of what is being stored in the state
			setStartDate(""); // sets them back to empty values
			setEndDate("");
			setDescription("");
			setMaxPresents(0);
			setMaxAttendees(0);
			setLocation("");
		}
	};
	const handleNameChange = (event) => {
		const value = event.target.value;
		setName(value);
	};
	const handleStartDateChange = (event) => {
		const value = event.target.value;
		setStartDate(value);
	};
	const handleEndDateChange = (event) => {
		const value = event.target.value;
		setEndDate(value);
	};
	const handleDescriptionChange = (event) => {
		const value = event.target.value;
		setDescription(value);
	};
	const handleMaxPresentionChange = (event) => {
		const value = event.target.value;
		setMaxPresents(value);
	};
	const handleMaxAttendeesChange = (event) => {
		const value = event.target.value;
		setMaxAttendees(value);
	};
	const handleLocationChange = (event) => {
		const value = event.target.value;
		setLocation(value);
	};

	const fetchData = async () => {
		const url = "http://localhost:8000/api/locations/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setLocations(data.locations);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new conference</h1>
					<form onSubmit={handleSubmit} id="create-conference-form">
						<div className="form-floating mb-3">
							<input
								onChange={handleNameChange}
								value={name}
								placeholder="Name"
								required
								type="text"
								id="name"
								name="name"
								className="form-control"
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleStartDateChange}
								value={startDate}
								placeholder="Start date"
								required
								type="date"
								id="starts"
								name="starts"
								className="form-control"
							/>
							<label htmlFor="starts">Start date</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleEndDateChange}
								value={endDate}
								placeholder="End date"
								required
								type="date"
								id="ends"
								name="ends"
								className="form-control"
							/>
							<label htmlFor="ends">End date</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleMaxPresentionChange}
								value={maxPresents}
								placeholder="Max presentations"
								required
								type="number"
								id="max_presentations"
								name="max_presentations"
								className="form-control"
							/>
							<label htmlFor="max_presentations">
								Max presentations
							</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleMaxAttendeesChange}
								value={maxAttendees}
								placeholder="Max attendees"
								required
								type="number"
								id="max_attendees"
								name="max_attendees"
								className="form-control"
							/>
							<label htmlFor="max_attendees">Max attendees</label>
						</div>
						<div className="mb-3">
							<label htmlFor="location" className="form-label">
								Location
							</label>
							<select
								onChange={handleLocationChange}
								value={location}
								required
								id="location"
								name="location"
								className="form-select"
							>
								<option value="">Choose a location</option>
								{locations.map((location) => {
									return (
										<option
											key={location.id}
											value={location.id}
										>
											{location.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label">
								Description
							</label>
							<textarea
								onChange={handleDescriptionChange}
								value={description}
								className="form-control"
								id="description"
								name="description"
								placeholder="Description"
								rows="3"
							></textarea>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ConferenceForm;
