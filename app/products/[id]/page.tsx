"use client"

import { ShoppingCart, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/app/types";
import Header from "@/app/components/ui/header";
import { addToCart } from "@/app/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data: Product = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6">Loading product...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <main className="max-w-7xl min-h-[100vh] mx-auto px-6 py-8">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-100  flex items-center justify-center p-10">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[420px] object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs bg-gray-200 px-3 py-1 rounded-full w-fit">
            {product.category}
          </span>

          <h2 className="text-3xl font-semibold">{product.title}</h2>

          <p className="text-2xl font-bold">${product.price}</p>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span>3.9</span>
            <span>(120 reviews)</span>
          </div>

          <hr className="my-4 text-gray-300" />

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                dispatch(addToCart(product))
                toast.success("Item added to cart");
              }}
              
              className="flex-1 bg-black text-white py-3 rounded hover:bg-black/90"
            >
              ADD TO CART
            </button>
            <button
              onClick={() => {
                dispatch(addToCart(product));
                toast.success("Item added to cart");
                router.push("/cart");
              }}
              className="flex-1 bg-gray-900 text-white py-3 rounded hover:bg-gray-800"
            >
              BUY NOW
            </button>
          </div>

          <button className="flex items-center gap-2 text-sm mt-4">
            <Heart size={16} /> Wishlist
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
