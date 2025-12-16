"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { Plus, Minus, Trash2, Star } from "lucide-react";
import { increaseQty, decreaseQty, removeFromCart} from "@/app/store/slices/cartSlice";
import toast from "react-hot-toast";

type CartItemProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  rating: number;
  reviews: number;
  image: string;
};

const ProductCartItem = ({
  id,
  title,
  description,
  price,
  quantity,
  rating,
  reviews,
  image,
}: CartItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-5 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative w-full sm:w-28 sm:h-28 h-36 bg-gray-100 rounded-xl overflow-hidden">
          <Image src={image} alt={title} priority fill sizes="(max-width: 640px) 100vw, 160px" className="object-contain p-4"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span>
              {rating} ({reviews})
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-lg font-semibold text-gray-900">
          ${(price * quantity).toFixed(2)}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3  rounded-full px-3 py-1">
            <button
              onClick={() => {
                dispatch(decreaseQty(id))
                toast.success("cart Item remove");
            }}
              disabled={quantity === 1}
              className="p-1 rounded border border-gray-400 hover:bg-white "
            >
              <Minus size={16} />
            </button>

            <span className="font-medium text-sm w-4 text-center">
              {quantity}
            </span>

            <button
              onClick={() => {
                  dispatch(increaseQty(id))
                  toast.success("cart Item added");

              }}
              className="p-1 rounded border border-gray-400 hover:bg-white"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => {
                dispatch(removeFromCart(id))
                toast.success("cart Item delete");

            }}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCartItem;
