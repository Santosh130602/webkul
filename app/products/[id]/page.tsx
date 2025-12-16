import { Product } from "@/app/types";
import ProductDetailClient from "./ProductDetailUI";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    {
      next: { revalidate: 180 }, 
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product: Product = await res.json();

  return <ProductDetailClient product={product} />;
}
