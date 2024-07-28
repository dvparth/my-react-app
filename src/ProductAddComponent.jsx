import { memo, useState } from "react";
import { useRenderCount } from "./useRenderCount";
import PropTypes from "prop-types";

const ProductAddComponent = ({ accountTypes, onAdd }) => {
  useRenderCount("ProductAddComponent", true);
  const [accountType, setaccountType] = useState(accountTypes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAdd(accountType, quantity);
  };
  return (
    <>
      {accountTypes && (
        <div>
          <select
            value={accountType.code}
            onChange={(e) => {
              const a = accountTypes.filter(
                (acc) => acc.code == e.target.value
              )[0];
              setaccountType(a);
            }}
          >
            {accountTypes.map((type, index) => (
              <option key={index} value={type.code}>
                {type.description}
              </option>
            ))}
          </select>
          <select
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
    </>
  );
};

ProductAddComponent.propTypes = {
  accountTypes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
};
export default memo(ProductAddComponent);
