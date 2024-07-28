import { useRenderCount } from "./useRenderCount";
import PropTypes from "prop-types";

const ownershipTypes = ["Individual", "Joint", "Corporate"];

const ProductDetailComponent = ({ component, onDelete, onUpdate, onCopy }) => {
  const { id, accountTypeCode, accountDescription, nickname, ownershipType } =
    component;
  useRenderCount(`ProductDetailComponent-${accountDescription}-${id}`, true);
  const handleDelete = () => onDelete(id);
  const handleCopy = () => onCopy(component);
  const handleUpdate = (e) => {
    onUpdate(id, e.target.getAttribute("data-identifier"), e.target.value);
  };
  return (
    <div>
      <h3>
        {accountDescription}
        {id}
        {accountTypeCode}
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

export default ProductDetailComponent;
