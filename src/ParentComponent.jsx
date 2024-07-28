import { useCallback, useState } from "react";
import ProductDetailComponent from "./ProductDetailComponent";
import ProductAddComponent from "./ProductAddComponent";
import { useRenderCount } from "./useRenderCount";
const accountTypes = [
  { code: -1, description: "Please select" },
  { code: 1, description: "Checking" },
  { code: 2, description: "Savings" },
  { code: 3, description: "Business" },
];
const ParentComponent = () => {
  useRenderCount("ParentComponent", true);
  const [productDetailComponents, setproductDetailComponents] = useState([]);
  console.log(
    "productDetailComponents",
    JSON.stringify(productDetailComponents)
  );
  const handleAdd = useCallback((accountType, quantity) => {
    const newproductDetailComponent = {
      id: Date.now(),
      accountTypeCode: accountType.code.toString(),
      accountDescription: accountType.description,
      quantity,
      nickname: accountType.description,
    };
    setproductDetailComponents((prevState) => {
      return [...prevState, newproductDetailComponent];
    });
  }, []);
  const handleUpdate = (id, field, value) => {
    setproductDetailComponents((prevState) =>
      prevState.map((component) =>
        component.id === id ? { ...component, [field]: value } : component
      )
    );
  };
  const handleCopy = (componentToCopy) => {
    const newComponent = { ...componentToCopy, id: Date.now() };
    setproductDetailComponents([...productDetailComponents, newComponent]);
  };
  const handleDelete = (id) => {
    setproductDetailComponents((prevState) =>
      prevState.filter((component) => component.id !== id)
    );
    console.log(
      "productDetailComponents_post",
      JSON.stringify(productDetailComponents)
    );
  };
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
      <ProductAddComponent accountTypes={accountTypes} onAdd={handleAdd} />
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
