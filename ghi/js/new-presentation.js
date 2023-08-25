window.addEventListener("DOMContentLoaded", async () => {
	const url = "http://localhost:8000/api/conferences/";

	const response = await fetch(url);

	const formTag = document.getElementById("create-presentation-form");
	formTag.addEventListener("submit", async (event) => {
		event.preventDefault();
		const formData = new FormData(formTag);
		const conferenceId = formData.get("conference");
		const json = JSON.stringify(Object.fromEntries(formData));
		const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
		console.log(json);
		const fetchConfig = {
			method: "post",
			body: json,
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(presentationUrl, fetchConfig);
		if (response.ok) {
			formTag.reset();
			const newPresentation = await response.json();
			console.log(newPresentation);
		}
	});

	if (response.ok) {
		const data = await response.json();
		const selectTag = document.getElementById("conference");
		for (let conference of data.conferences) {
			const option = document.createElement("option");
			option.value = conference.id;
			option.innerHTML = conference.name;
			selectTag.append(option);
		}
	}
});
