import React from "react";

const SectionList = ({ title, list }) => {
  return (
    <div className="sectionlist-container">
      <div className="sectionlist--title">{title}</div>
      {list.map((item, index) => {
        return (
          <a key={index} className="sectionlist--option">
            {item}
          </a>
        );
      })}
    </div>
  );
};

export default SectionList;
