import supabase from "../config/SupabaseClient";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";

const Home = () => {
  const [error, setError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleSetOrderBy = (data) => {
    setOrderBy(data);
  };

  const handleDelete = async (id) => {
    const { data } = await supabase.auth.getUser();
    if (data.user == null) {
      setError("You must be logged in to delete a smoothie.");
      return;
    }

    try {
      const { error } = await supabase.from("smoothies").delete().eq("id", id);

      if (error) {
        throw error;
      }

      setSmoothies((prevSmoothies) => {
        return prevSmoothies.filter((sm) => sm.id !== id);
      });
    } catch (error) {
      if (error.message.includes("RLS")) {
        setError("You do not have permission to delete this smoothie.");
      } else {
        setError("An error occurred while deleting the smoothie.");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select("*")
        .order(orderBy, { ascending: false });

      if (error) {
        setSmoothies(null);
        setError("An error occurred while fetching smoothies.");
        console.log(error);
      } else {
        setSmoothies(data);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="py-8">
      {error && <p className="text-red-500">{error}</p>}
      {smoothies && (
        <>
          <div className="flex justify-end mb-4">
            <Dropdown onData={handleSetOrderBy} />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {smoothies.map((smoothie) => (
              <Card
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={() => handleDelete(smoothie.id)}
                className="border-2 border-black rounded-lg"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
