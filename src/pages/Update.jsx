import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClient";

const Update = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      .eq("id", id)
      .select("*");

    if (error) {
      setFormError(error);
      return;
    }

    if (data) {
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }

      if (error) {
        navigate("/", { replace: true });
      }
    }

    fetchData();
  }, [id, navigate]);

  return (
    <div className="flex items-center justify-center page create">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[50%] p-4 justify-center items-center space-y-8 bg-gray-200 border border-black rounded-xl">
        <div className="flex flex-col items-center justify-center w-full">
          <label htmlFor="title">Title:</label>
          <input
            className="w-full p-2 rounded-lg"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <label htmlFor="method">Method:</label>
          <textarea
            className="w-full p-2 rounded-lg"
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <label htmlFor="rating">Rating:</label>
          <input
            min={1}
            max={5}
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 rounded-lg"
          />
        </div>

        <button className="px-4 py-2 bg-green-400 rounded-xl">
          Update Smoothie Recipe
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
