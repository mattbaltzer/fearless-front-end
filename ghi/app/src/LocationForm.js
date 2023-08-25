import React, { useEffect, useState } from "react";

function LocationForm() {
  const [states, setStates] = useState([]);
  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const fetchData = async () => {
    const url = "http://localhost:8000/api/states/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setStates(data.states);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new location</h1>
          <form id="create-location-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                placeholder="Name"
                required
                type="text"
                id="name"
                name="name"
                className="form-control"
              />
              <label forHtml="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Room count"
                required
                type="number"
                id="room_count"
                name="room_count"
                className="form-control"
              />
              <label forHtml="room_count">Room count</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="City"
                required
                type="text"
                id="city"
                name="city"
                className="form-control"
              />
              <label forHtml="city">City</label>
            </div>
            <div className="mb-3">
              <select required id="state" name="state" className="form-select">
                <option value="">Choose a state</option>
                {states.map((state) => {
                  return (
                    <option key={state.abbreviation} value={state.abbreviation}>
                      {state.name}
                    </option>
                  );
                })}
                ;
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LocationForm;
