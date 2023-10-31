import React from "react";

const CreateCategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add New Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
