import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import { memo, useCallback, useRef } from "react";
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
    <Box mt={4}>
      {accountTypes && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Account Type</InputLabel>
            <Select
              inputRef={accountTypeRef}
              defaultValue={accountTypes[0].code}
            >
              {accountTypes.map((type, index) => (
                <MenuItem key={index} value={type.code}>
                  {type.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Quantity</InputLabel>
            <Select inputRef={quantityRef} defaultValue={0}>
              <MenuItem key={0} value={0}>
                Please select
              </MenuItem>
              {quantity &&
                [...Array(quantity).keys()].map((num) => (
                  <MenuItem key={num + 1} value={num + 1}>
                    {num + 1}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleAddClick}>
            Add
          </Button>
        </>
      )}
    </Box>
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
