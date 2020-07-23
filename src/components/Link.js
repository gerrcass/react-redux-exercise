import React from "react";

const Link = ({ active, children, onClick }) => {
  return active ? (
    <span>{children}</span>
  ) : (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
  /* // same as above
      if (active) {
        return <span>{children}</span>;
      }
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          {children}
        </a>
      ); */
};

export default Link;
