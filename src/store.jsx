import { create } from "zustand";
import { getDefaultProduct } from "./productService";

const useStore = create((set) => ({
  accountTypes: [
    { code: "savings", description: "Savings" },
    { code: "checking", description: "Checking" },
    { code: "business", description: "Business" },
  ],
  ownershipTypes: ["Individual", "Joint", "Corporate"],
  renderedProducts: [],
  addProduct: (accountType, quantity) =>
    set((state) => ({
      renderedProducts: [
        ...state.renderedProducts,
        ...[...Array(+quantity).keys()].map(() =>
          getDefaultProduct(accountType)
        ),
      ],
    })),
  updateProduct: (id, field, value) => {
    set((state) => ({
      renderedProducts: state.renderedProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      ),
    }));
  },
  deleteProduct: (id) => {
    set((state) => ({
      renderedProducts: state.renderedProducts.filter(
        (product) => product.id !== id
      ),
    }));
  },
  copyProduct: (product) => {
    set((state) => ({
      renderedProducts:
        state.renderedProducts.length == 10
          ? state.renderedProducts
          : [...state.renderedProducts, { ...product, id: Math.random() }],
    }));
  },
}));

export default useStore;
