import React, { useEffect, useState } from "react";

function PresentationForm() {
	const [conferences, setConferences] = useState([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [company, setCompany] = useState("");
	const [title, setTitle] = useState("");
	const [synopsis, setSynopsis] = useState("");
	const [conferece, setConference] = useState("");

	const fetchData = async () => {
		const url = "http://localhost:8000/api/conferences/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setConferences(data.conferences);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.presenter_name = name;
		data.presenter_email = email;
		data.company_name = company;
		data.title = title;
		data.synopsis = synopsis;
		data.conference = conferece;
		console.log(data);

		const formTag = document.getElementById("create-presentation-form");
		const selectTag = document.getElementById("conference");
		formTag.addEventListener("submit", async (event) => {
			event.preventDefault();
			const formData = new FormData(formTag);
			const json = JSON.stringify(Object.fromEntries(formData));

			const conferenceId =
				selectTag.options[selectTag.selectedIndex].value;
			const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
			const fetchConfig = {
				method: "post",
				body: json,
				headers: {
					"Content-Type": "application/json",
				},
			};

			const response = await fetch(presentationUrl, fetchConfig);
			if (response.ok) {
				const newPresentation = await response.json();
				console.log(newPresentation);

				setName("");
				setEmail("");
				setCompany("");
				setTitle("");
				setSynopsis("");
				setConference("");
			}
		});
	};
	const handleNameChange = (event) => {
		const value = event.target.value;
		setName(value);
	};
	const handleEmailChange = (event) => {
		const value = event.target.value;
		setEmail(value);
	};
	const handleCompanyChange = (event) => {
		const value = event.target.value;
		setCompany(value);
	};
	const handleTitleChange = (event) => {
		const value = event.target.value;
		setTitle(value);
	};
	const handleSynopsisChange = (event) => {
		const value = event.target.value;
		setSynopsis(value);
	};
	const handleConferenceChange = (event) => {
		const value = event.target.value;
		setConference(value);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new presentation</h1>
					<form onSubmit={handleSubmit} id="create-presentation-form">
						<div className="form-floating mb-3">
							<input
								onChange={handleNameChange}
								value={name}
								placeholder="Presenter name"
								required
								type="text"
								id="presenter_name"
								name="presenter_name"
								className="form-control"
							/>
							<label htmlFor="presenter_name">
								Presenter name
							</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleEmailChange}
								value={email}
								placeholder="Presenter email"
								required
								type="email"
								id="presenter_email"
								name="presenter_email"
								className="form-control"
							/>
							<label htmlFor="presenter_email">
								Presenter email
							</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleCompanyChange}
								value={company}
								placeholder="Company name"
								type="text"
								id="company_name"
								name="company_name"
								className="form-control"
							/>
							<label htmlFor="company_name">Company name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleTitleChange}
								value={title}
								placeholder="Title"
								required
								type="text"
								id="title"
								name="title"
								className="form-control"
							/>
							<label htmlFor="title">Title</label>
						</div>
						<div className="mb-3">
							<label htmlFor="synopsis" className="form-label">
								Synopsis
							</label>
							<textarea
								onChange={handleSynopsisChange}
								value={synopsis}
								className="form-control"
								id="synopsis"
								name="synopsis"
								rows="3"
							></textarea>
						</div>
						<div className="mb-3">
							<label htmlFor="conference" className="form-label">
								Conference
							</label>
							<select
								onChange={handleConferenceChange}
								value={conferece}
								required
								id="conference"
								name="conference"
								className="form-select"
							>
								<option value="">Choose a conference</option>
								{conferences.map((conference) => {
									return (
										<option
											key={conference.id}
											value={conference.id}
										>
											{conference.name}
										</option>
									);
								})}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default PresentationForm;
