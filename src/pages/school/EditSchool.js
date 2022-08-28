import React from "react";
import { useParams } from "react-router-dom";

function EditSchool() {
  const { id } = useParams();
  
  return (
    <div>
      <h3>EditSchool: {id}</h3>
    </div>
  );
}

export default EditSchool;
