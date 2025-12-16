import { Suspense } from "react";
import ProductsClient from "./ProductsUI";
import { Product } from "@/app/types";

export const dynamic = "force-dynamic"; 
export const revalidate = 60;

const ProductsPage = async () => {
  let products: Product[] = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      products = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  return (
    <Suspense fallback={<p className="p-6">Loading products...</p>}>
      <ProductsClient products={products} />
    </Suspense>
  );
};

export default ProductsPage;
