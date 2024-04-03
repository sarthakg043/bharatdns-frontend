import "./App.css";
import Signin from "./pages/login/Signin";
import Signup from "./pages/login/Signup";
import Database from "./pages/database/Database";
import Layout from "./Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Database />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            {/* <Route path='user/:userid' element={<User />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
