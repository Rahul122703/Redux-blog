import { useDispatch } from "react-redux";

import { addReaction } from "./postsSlice";

const allButtons = {
  like: "👍",
  smile: "😊",
  love: "❤️",
  link: "🔗",
  coffee: "☕",
};

const ReactionButtons = ({ blogid, reaction }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex text-xl border border-none">
      {Object.entries(reaction).map(([key, value]) => (
        <button
          key={key}
          className="hover:scale-110 transition"
          onClick={(e) => {
            dispatch(addReaction({ key, blogid }));
          }}>
          {allButtons[key]} {value}
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
