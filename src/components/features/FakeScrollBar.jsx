import PropTypes from "prop-types";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const FakeScrollBar = ({ visible }) => {
  return (
    visible && (
      <div
        className="absolute right-0 top-0 z-10 flex h-full w-[17px] flex-col items-center bg-gray-200"
        aria-hidden="true"
      >
        <AiFillCaretUp className="mt-1 text-[10px] text-gray-400" />
        <AiFillCaretDown className="mb-1 mt-auto text-[10px] text-gray-400" />
      </div>
    )
  );
};

FakeScrollBar.propTypes = {
  visible: PropTypes.bool.isRequired, // `visible` doit être un booléen requis
};

export default FakeScrollBar;
