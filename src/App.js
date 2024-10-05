import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";

function App() {
  return (
    <>
      <Navbar title="TestUtils" textutils="About textUtils" />
      <TextForm heading="Enter Text Here" />
    </>
  );
}

export default App;
