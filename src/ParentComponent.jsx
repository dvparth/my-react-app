import { useCallback } from "react";
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
    <div>
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
      <button
        onClick={() => {
          console.log(JSON.stringify(renderedProducts));
        }}
      >
        Show
      </button>
    </div>
  );
};
export default ParentComponent;
