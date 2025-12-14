"use client";

import { useSelector } from "react-redux";
import { RootState } from '../store/index';
import ProductCartItem from "../components/ui/productcartitem";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/app/store/slices/cartSlice";

const ProductCart = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state: RootState) => state.cart.items
    );

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const tax = subtotal * 0.08;
    const shipping = subtotal > 0 ? 0 : 0;
    const total = subtotal + tax + shipping;

    if (cartItems.length === 0) {
        return (
            <main className="min-h-[70vh] flex items-center justify-center">
                <div className="max-w-md w-full px-6 py-16  rounded-xl text-center bg-white ">
                    <h1 className="text-3xl font-semibold">Your Cart is Empty</h1>
                    <p className="text-gray-500 mt-2">
                        Add products to see them here
                    </p>
                      <button className="w-fit border py-1 px-6 bg-black text-white rounded-lg mt-3 cursor-pointer" onClick={() => router.push('/products')}>
                        Go To Products
                    </button>
                </div>
            </main>

        );
    }

    const handleCheckout = () => {
        dispatch(clearCart());
        router.push("/OrderSuccess");
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-semibold">
                    Shopping Cart
                </h1>
                <p className="text-gray-500 mt-2">
                    Review and manage your cart items
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 border border-gray-200 rounded-xl p-4 sm:p-6 space-y-6">
                    <h2 className="font-semibold text-lg">
                        Cart Items ({cartItems.length})
                    </h2>

                    {cartItems.map((item) => (
                        <ProductCartItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            quantity={item.quantity}
                            rating={item.rating.rate}
                            reviews={item.rating.count}
                            image={item.image}
                        />
                    ))}

                </div>

                <div className="border border-gray-200 rounded-xl p-6 h-fit">
                    <h2 className="font-semibold text-lg mb-6">
                        Order Summary
                    </h2>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <hr />

                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="w-full bg-black text-white py-3 rounded-lg mt-6" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>

                    <button className="w-full border py-3 rounded-lg mt-3 cursor-pointer" onClick={() => router.push('/products')}>
                        Continue Shopping
                    </button>
                </div>
            </div>


        </main>
    );
};

export default ProductCart;
