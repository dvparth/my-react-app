import { memo, useCallback, useRef } from "react";
import { useRenderCount } from "./useRenderCount";
import PropTypes from "prop-types";
import useStore from "./store";

const ProductAddComponent = ({ quantity }) => {
  const accountTypes = useStore((state) => state.accountTypes);
  const addProduct = useStore((state) => state.addProduct);
  const quantityRef = useRef(0);
  const accountTypeRef = useRef(accountTypes[0].code);

  const handleAddClick = useCallback(() => {
    if (!accountTypes || !quantity) {
      console.error("Error: accountTypes or quantity is undefined or null");
      return;
    }
    const handleAdd = () => {
      addProduct(
        accountTypes.find((a) => a.code === accountTypeRef.current.value),
        quantityRef.current.value
      );
      quantityRef.current.value = 0;
      accountTypeRef.current.value = accountTypes[0].code;
    };

    handleAdd();
  }, [addProduct, accountTypes, accountTypeRef, quantityRef]);

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
          <button onClick={handleAddClick}>Add</button>
        </div>
      )}
    </>
  );
};

ProductAddComponent.propTypes = {
  quantity: PropTypes.number.isRequired,
};

// const propsAreqEqual = (prevProps, nextProps) => {
//   console.log(prevProps.onAdd === nextProps.onAdd);
//   console.log(prevProps.quantity === nextProps.quantity);
//   return false;
// };
export default memo(ProductAddComponent);
