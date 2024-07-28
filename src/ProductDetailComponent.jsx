import { memo } from "react";
import { useRenderCount } from "./useRenderCount";
import PropTypes from "prop-types";
import { getOwnershipTypes } from "./productService";

const ownershipTypes = getOwnershipTypes();
const ProductDetailComponent = ({ component, onDelete, onUpdate, onCopy }) => {
  const { id, accountDescription, nickname, ownershipType } = component;
  useRenderCount(`ProductDetailComponent-${accountDescription}-${id}`, true);
  const handleDelete = () => onDelete(id);
  const handleCopy = () => onCopy(component);
  const handleUpdate = (e) => {
    onUpdate(id, e.target.getAttribute("data-identifier"), e.target.value);
  };
  return (
    <div>
      <h3>
        {accountDescription}-{id}
      </h3>
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
      <button onClick={handleCopy}>Copy</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
ProductDetailComponent.propTypes = {
  component: PropTypes.shape({
    id: PropTypes.number.isRequired,
    accountTypeCode: PropTypes.string.isRequired,
    accountDescription: PropTypes.string.isRequired,
    nickname: PropTypes.string,
    ownershipType: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};
// const propsAreEqual = (prevProps, nextProps) => {
//   console.log(prevProps.component === nextProps.component);
//   console.log(prevProps.onCopy === nextProps.onCopy);
//   console.log(prevProps.onDelete === nextProps.onDelete);
//   console.log(prevProps.onUpdate === nextProps.onUpdate);
//   return true;
// };
export default memo(ProductDetailComponent);
