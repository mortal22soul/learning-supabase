import { useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClient";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const updateLoginState = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const auth = async (e) => {
    e.preventDefault();

    let { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    if (data) {
      navigate("/", { replace: true });
    }

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        className="flex border-2 border-black bg-gray-200 p-4 rounded-xl w-[50%] flex-col items-center justify-center space-y-4 m-4"
        onSubmit={auth}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="user@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-lg"
        />
        <button className="px-4 py-2 bg-green-400 rounded-xl">
          {isLoggedIn ? "Login" : "Sign up"}
        </button>
        <span className="hover:cursor-pointer" onClick={updateLoginState}>
          {isLoggedIn
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </span>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
