"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-semibold mb-2">
          Order Placed Successfully 
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <button
          onClick={() => router.push("/products")}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-black/90 transition"
        >
          Continue Shopping
        </button>
      </div>
    </main>
  );
}
