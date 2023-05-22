import React from "react";
import './Alert.css';

function Alert(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {/* <strong>{capitalize(props.alert.type)}</strong>
          : */}
          <strong className="alert-msg">
            {props.alert.msg}
          </strong>
        </div>
      )}
    </div>
  );
}

export default Alert;
