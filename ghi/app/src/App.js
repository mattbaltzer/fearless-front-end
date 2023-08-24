import Nav from "./Nav.js";
import AttendeesList from "./AttendeesList.js";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
      <Nav />
      <div className="container">
        <AttendeesList attendees={props.attendees} />
      </div>
    </>
  );
}

export default App;
