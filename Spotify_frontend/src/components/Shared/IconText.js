import { Icon } from "@iconify/react";
import { Link } from "react-router-dom"; 
const IconText = ({ iconName, displayText, active, targetLink, onClick}) => {
  return (
    <Link to={targetLink} className="block">
      <div className="flex flex-col sm:flex-row items-center justify-start cursor-pointer" onClick={onClick}>
        <div className="px-2 sm:px-5 py-1 sm:py-2">
          <Icon
            icon={iconName}
            color={active ? "white" : "gray"}
            fontSize={27}
          />
        </div>
        <div
          className={`${
            active ? "text-white" : "text-gray-400"
          } font-semibold text-sm hover:text-white`}
        >
          {displayText}
        </div>
      </div>
    </Link>
  );
};

export default IconText;
