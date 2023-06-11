import React from "react";
export const CustomButton = (props) => {
  return (
    <div>
      <button className="btn" type="{props.type}" onClick={props.onClick}>
        {props.name}
      </button>
    </div>
  );
};