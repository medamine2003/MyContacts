import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WelcomePage from "./pages/WelcomePage";
import ContactForm from "./pages/ContactForm";
function App() {
  return (
    <>
    
    
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/contactform" element={<ContactForm />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
