import { useEffect, useRef } from "react";
import { useRenderCount } from "./useRenderCount";

const ownershipTypes = ["Individual", "Joint", "Corporate"];

const ProductDetailComponent = ({ component, onDelete, onUpdate, onCopy }) => {
  const { id, accountTypeCode, accountDescription, nickname, ownershipType } =
    component;
  useRenderCount(`ProductDetailComponent-${accountDescription}-${id}`, true);

  const handleUpdate = (e) => {
    onUpdate(id, e.target.getAttribute("data-identifier"), e.target.value);
  };
  return (
    <div>
      <h3>{accountDescription}</h3>
      <input
        name="nickname"
        data-identifier="nickname"
        onBlur={handleUpdate}
        defaultValue={nickname}
      />
      <select
        defaultValue={ownershipType}
        onChange={handleUpdate}
        data-identifier="ownershipType"
        name="ownershipType"
      >
        {ownershipTypes.map((ownershipType, index) => (
          <option key={index} value={ownershipType}>
            {ownershipType}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ProductDetailComponent;
