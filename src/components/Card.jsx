import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import supabase from "../config/SupabaseClient";
import { useEffect, useState } from "react";

const Card = ({ smoothie, onDelete }) => {
  const [data, setData] = useState({ user: null });

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setData(data.user);
      }
    };

    checkAuth();
  }, []);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      // console.log(data);
      onDelete(smoothie.id);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-200 border-2 border-black rounded-lg">
      <span className="text-lg font-semibold">{smoothie.title}</span>
      <span>{smoothie.method}</span>
      <span>{"★".repeat(smoothie.rating)}</span>
      {data.email && (
        <div className="flex justify-end px-4 space-x-2">
          <Link to={"/" + smoothie.id}>
            <i className="material-icons">edit</i>
          </Link>
          <Link>
            <i className="material-icons" onClick={handleDelete}>
              delete
            </i>
          </Link>
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  smoothie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
