import { Box, Typography, Container, Button } from "@mui/material";
import ProductDetailComponent from "./ProductDetailComponent";
import ProductAddComponent from "./ProductAddComponent";
import { useRenderCount } from "./useRenderCount";
import useStore from "./store";

const ParentComponent = () => {
  useRenderCount("ParentComponent", true);
  const renderedProducts = useStore((state) => state.renderedProducts);

  const updateProduct = useStore((state) => state.updateProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);
  const copyProduct = useStore((state) => state.copyProduct);

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4">Account Management</Typography>
      </Box>
      {renderedProducts &&
        renderedProducts.map((renderedProduct) => (
          <ProductDetailComponent
            key={renderedProduct.id}
            component={renderedProduct}
            onCopy={copyProduct}
            onDelete={deleteProduct}
            onUpdate={updateProduct}
          />
        ))}
      <ProductAddComponent
        quantity={
          10 - renderedProducts.length > 0 ? 10 - renderedProducts.length : 0
        }
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          console.log(JSON.stringify(renderedProducts));
        }}
      >
        Show
      </Button>
    </Container>
  );
};
export default ParentComponent;
