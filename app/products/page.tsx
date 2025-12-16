
import { Suspense } from "react";
import { Product } from "@/app/types";
import ProductsClient from "./ProductsUI";
export const dynamic = "force-dynamic";

export const revalidate = 60;

const ProductsPage = async () => {
  const res = await fetch(
    "https://fakestoreapi.com/products",
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return (
    <Suspense fallback={<p> Loading...</p>}>
      <ProductsClient products={products} />
     </Suspense>
  );
};

export default ProductsPage;

