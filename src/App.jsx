import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "./config/SupabaseClient";
import "./App.css";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Login from "./pages/Login";
import User from "./components/User";
import Logout from "./components/Logout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateLoginState = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // console.log(user);
        setIsLoggedIn(true);
      }
    };

    updateLoginState();
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/" className="text-4xl font-semibold">
          Supa Smoothies
        </Link>
        <User />
        {isLoggedIn && <Logout />}
        {isLoggedIn && <Link to="/create">Create New Smoothie</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
