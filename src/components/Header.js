import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <div className="header">
      <FontAwesomeIcon className="list-icon" icon={["far", "list-alt"]} />
      <h1>To Do List</h1>
    </div>
  );
};

export default Header;
