import React from "react";

const SpinnerOnly = () => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
};

export default SpinnerOnly;
