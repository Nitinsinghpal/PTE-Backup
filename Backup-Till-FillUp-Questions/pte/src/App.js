import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import QueData from "./Components/QueData";
import Reading from "./Components/Reading/Reading";
import Writing from "./Components/Writing";
import Listening from "./Components/Listening";
import Speaking from "./Components/Speaking";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Reading />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/listening" element={<Listening />} />
        <Route path="/speaking" element={<Speaking />} />
        {/* <Route path="/dragDrop" element={<DragAndDrop />} /> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
