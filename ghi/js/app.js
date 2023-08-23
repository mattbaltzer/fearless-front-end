function createCard(name, description, pictureUrl) {
  return `
  <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
      <div class="card">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
    </div>
    `;
}

window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error url does not exist");
    } else {
      const data = await response.json();

      let index = 0; // keeps track of which column we want our content in

      for (let i = 0; i < data.conferences.length; i++) {
        const detailUrl = `http://localhost:8000${data.conferences[i].href}`;
        const detailResponse = await fetch(detailUrl);

        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const name = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const html = createCard(name, description, pictureUrl);
          const columns = document.querySelectorAll(".col"); // columns is a NodeList of all locations where 'col' appears
          const column = columns[index]; // column is an object; grabs the location from the querySelecctor (div col 0, div col 1, div col 2)
          column.innerHTML += html; // put the cord information in html into that specific column
          index++;
          if (index === 3) {
            index = 0;
          }
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
});
