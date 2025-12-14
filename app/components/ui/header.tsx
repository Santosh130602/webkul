"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const Header = () => {
  const router = useRouter();
  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-2xl font-semibold">Ecommerce Store</h1>

      <div
        className="relative cursor-pointer"
        onClick={() => router.push("/cart")}
      >
        <ShoppingCart size={28} />

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-black/90 text-white text-xs font-semibold rounded-full px-2 py-0.5 min-w-[18px] text-center">
            {totalItems}
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
