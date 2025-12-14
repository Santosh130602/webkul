"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@/app/components/products/ProductCard";
import { Product } from "@/app/types/index";
import { useRouter } from "next/navigation";
import Header from "../components/ui/header";
import { ChevronFirst, ChevronLast } from "lucide-react";


type SortOption =
    | "ascprice"
    | "descprice"
    | "ascname"
    | "descname"
    | "ascrating"
    | "descrating"
    | "";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [sortBy, setSortBy] = useState<SortOption>("");
    const router = useRouter();
    const PER_PAGE_ITEM = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://fakestoreapi.com/products");
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        if (search.trim()) {
            result = result.filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (categoryFilter) {
            result = result.filter(
                (product) => product.category === categoryFilter
            );
        }

        switch (sortBy) {
            case "ascprice":
                result.sort((a, b) => a.price - b.price);
                break;

            case "descprice":
                result.sort((a, b) => b.price - a.price);
                break;

            case "ascname":
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;

            case "descname":
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;

            case "ascrating":
                result.sort(
                    (a, b) => a.rating.rate - b.rating.rate
                );
                break;

            case "descrating":
                result.sort(
                    (a, b) => b.rating.rate - a.rating.rate
                );
                break;

            default:
                break;
        }

        return result;
    }, [products, categoryFilter, sortBy, search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [categoryFilter, sortBy]);




    const totalPages = Math.ceil(
        filteredAndSortedProducts.length / PER_PAGE_ITEM
    );
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PER_PAGE_ITEM;
        const endIndex = startIndex + PER_PAGE_ITEM;

        return filteredAndSortedProducts.slice(startIndex, endIndex);
    }, [filteredAndSortedProducts, currentPage]);




    const categories = useMemo(() => {
        const set = new Set<string>();
        products.forEach((p) => set.add(p.category));
        return ["", ...Array.from(set)];
    }, [products]);


    const handleProductClick = (id: number) => {
        router.push(`/products/${id}`);
    };



    if (loading) return <div className="p-6">Loading products...</div>;
    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

    return (
        <main className="max-w-7xl mx-auto px-4 py-6">
            <Header />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto px-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                        <label className="text-sm whitespace-nowrap">
                            Filter
                        </label>

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="border rounded px-4 py-2 w-full sm:w-52"
                        >
                            <option value="">All Categories</option>
                            {categories
                                .filter((c) => c)
                                .map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                        <label className="text-sm whitespace-nowrap">
                            Search
                        </label>

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded px-4 py-2 w-full sm:w-64"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto px-4">
                    <label className="text-sm whitespace-nowrap">
                        Sort
                    </label>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="border rounded px-4 py-2 w-full sm:w-52"
                    >
                        <option value="">Default</option>
                        <option value="price-asc">Price - Low to High</option>
                        <option value="price-desc">Price - High to Low</option>
                        <option value="rating-desc">Rating - High to Low</option>
                        <option value="rating-asc">Rating - Low to High</option>
                        <option value="name-asc">Name - A to Z</option>
                        <option value="name-desc">Name - Z to A</option>
                    </select>
                </div>
            </div>

          
            <p className="text-sm mb-1">
                Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {paginatedProducts.map((pro) => (
                    <ProductCard
                        key={pro.id}
                        product={pro}
                        onClick={(id) => handleProductClick(id)}
                    />
                ))}

            </div>


            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-1 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        <ChevronFirst />
                    </button>

                    <span className="text-md text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-1 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition "
                    >
                        <ChevronLast />
                    </button>
                </div>
            )}


        </main>
    );
}


export default ProductsPage