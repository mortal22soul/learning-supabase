import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClient";

const Create = () => {
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
      .insert([{ title, method, rating }])
      .select("*");

    if (error) {
      console.log(error);
      setFormError("There was an error submitting the form. Please try again.");
      return;
    }

    if (data) {
      // console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center page create">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[50%] p-4 justify-center items-center space-y-8 bg-gray-200 border border-black rounded-xl">
        <div className="flex flex-col w-full ">
          <label htmlFor="title">Title:</label>
          <input
            className="w-full p-2 rounded-lg"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="method">Method:</label>
          <textarea
            className="w-full p-2 rounded-lg"
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full">
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
          Create Smoothie Recipe
        </button>

        {formError && <p className="text-red-500 error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
