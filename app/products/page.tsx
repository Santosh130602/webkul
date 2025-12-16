import ProductsClient from "./ProductsUI";
import { Product } from "@/app/types";

export const dynamic = "force-dynamic";

const ProductsPage = async () => {
  let products: Product[] = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await res.json();
  } catch (error) {
    console.error("Products fetch error:", error);
  }

  return <ProductsClient products={products} />;
};

export default ProductsPage;
