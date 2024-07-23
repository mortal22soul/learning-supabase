import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";
import { Link } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      setError(error.message);
    }

    if (data) {
      setUser(data.user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {error && <p className="hidden text-red-500">{error}</p>}
      {user ? (
        <div>
          <p>{user.email}</p>
          {/* Add more user details if needed */}
        </div>
      ) : (
        <Link to="login">Login to create a new smoothie</Link>
      )}
    </div>
  );
};

export default User;
