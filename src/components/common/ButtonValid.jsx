import { FaPaperPlane } from "react-icons/fa";
import PropTypes from "prop-types";

const ButtonValid = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-center rounded-md bg-name-orange px-6 py-2 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FaPaperPlane className="mr-2" />
        Envoyer
      </button>
    </div>
  );
};

ButtonValid.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonValid;
