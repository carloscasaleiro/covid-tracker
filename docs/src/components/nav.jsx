import React from "react";

function Nav({ options, selected, select }) {
  return (
    <ul className={`nav nav-tabs border-bottom-0`}>
      {options.map((name, index) => (
        <li className="nav-item w-50" key={name}>
          <button
            className={`nav-link w-100 ${
              index === selected
                ? `active bg-white border-bottom-0 
                ${selected ? "text-danger" : "text-info"} 
                ${selected ? "border-danger" : "border-info"}`
                : "border-bottom bg-light text-secondary"
            }`}
            onClick={() => {
              select(index);
            }}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Nav;
