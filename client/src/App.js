import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import AddNew from "./routes/AddNew";
import Contact from "./routes/Contact";
import Forgot from "./routes/Forgot";
import AboutRecipe from "./routes/AboutRecipe";
import AboutUser from "./routes/AboutUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addnew" element={<AddNew />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/aboutuser/:user" element={<AboutUser />} />
          <Route path="/aboutrecipe/:id" element={<AboutRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
