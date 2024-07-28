import { useCallback, useState } from "react";
import ProductDetailComponent from "./ProductDetailComponent";
import ProductAddComponent from "./ProductAddComponent";
import { useRenderCount } from "./useRenderCount";
import { getDefaultProduct } from "./productService";

const ParentComponent = () => {
  useRenderCount("ParentComponent", true);
  const [productDetailComponents, setproductDetailComponents] = useState([]);
  const handleAdd = useCallback((accountType, quantity) => {
    setproductDetailComponents((prevState) => {
      return [
        ...prevState,
        ...[...Array(+quantity).keys()].map(() =>
          getDefaultProduct(accountType)
        ),
      ];
    });
  }, []);
  const handleUpdate = useCallback((id, field, value) => {
    setproductDetailComponents((prevState) =>
      prevState.map((component) =>
        component.id === id ? { ...component, [field]: value } : component
      )
    );
  }, []);
  const handleCopy = useCallback((componentToCopy) => {
    const newComponent = { ...componentToCopy, id: Date.now() };
    setproductDetailComponents((prevState) =>
      prevState.length == 10 ? prevState : [...prevState, newComponent]
    );
  }, []);
  const handleDelete = useCallback((id) => {
    setproductDetailComponents((prevState) =>
      prevState.filter((component) => component.id !== id)
    );
  }, []);
  return (
    <div>
      {productDetailComponents &&
        productDetailComponents.map((productDetailComponent) => (
          <ProductDetailComponent
            key={productDetailComponent.id}
            component={productDetailComponent}
            onCopy={handleCopy}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      <ProductAddComponent
        quantity={
          10 - productDetailComponents.length > 0
            ? 10 - productDetailComponents.length
            : 0
        }
        onAdd={handleAdd}
      />
      <button
        onClick={() => {
          console.log(JSON.stringify(productDetailComponents));
        }}
      >
        Show
      </button>
    </div>
  );
};
export default ParentComponent;
