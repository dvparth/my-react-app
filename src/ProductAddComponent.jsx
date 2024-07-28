import { memo, useRef } from "react";
import { useRenderCount } from "./useRenderCount";
import PropTypes from "prop-types";
import { getAccountTypes } from "./productService";

const ProductAddComponent = ({ quantity, onAdd }) => {
  useRenderCount("ProductAddComponent", true);
  const accountTypes = getAccountTypes();
  const quantityRef = useRef(0);
  const accountTypeRef = useRef(accountTypes[0].code);
  const handleAdd = () => {
    onAdd(
      accountTypes.find((a) => a.code == accountTypeRef.current.value),
      quantityRef.current.value
    );
    quantityRef.current.value = 0;
    accountTypeRef.current.value = accountTypes[0].code;
  };
  return (
    <>
      {accountTypes && (
        <div>
          <select ref={accountTypeRef}>
            {accountTypes.map((type, index) => (
              <option key={index} value={type.code}>
                {type.description}
              </option>
            ))}
          </select>
          <select ref={quantityRef}>
            <option key={0} value={0}>
              Please select
            </option>
            {quantity &&
              [...Array(quantity).keys()].map((num) => (
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
  onAdd: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

// const propsAreqEqual = (prevProps, nextProps) => {
//   console.log(prevProps.onAdd === nextProps.onAdd);
//   console.log(prevProps.quantity === nextProps.quantity);
//   return false;
// };
export default memo(ProductAddComponent);
