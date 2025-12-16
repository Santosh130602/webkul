"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@/app/components/products/ProductCard";
import { Product } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
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

type Props = {
  products: Product[];
};

const ProductsClient = ({ products }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState<number>(() => {
    const page = Number(searchParams.get("page"));
    return page > 0 ? page : 1;
  });

  const PER_PAGE_ITEM = 8;

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
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
        result.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      case "descrating":
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
    }

    return result;
  }, [products, categoryFilter, sortBy, search]);

  useEffect(() => {
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [categoryFilter, sortBy, search]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", currentPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentPage]);

  useEffect(() => {
    const page = Number(searchParams.get("page"));
    if (page > 0 && page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PER_PAGE_ITEM
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE_ITEM;
    return filteredAndSortedProducts.slice(start, start + PER_PAGE_ITEM);
  }, [filteredAndSortedProducts, currentPage]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <Header />

     
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm whitespace-nowrap">Filter</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border rounded px-4 py-2 w-full sm:w-52"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm whitespace-nowrap">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-4 py-2 w-full sm:w-64"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 px-4">
          <label className="text-sm whitespace-nowrap">Sort</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border rounded px-4 py-2 w-full sm:w-52"
          >
            <option value="">Default</option>
            <option value="ascprice">Price - Low to High</option>
            <option value="descprice">Price - High to Low</option>
            <option value="ascrating">Rating - Low to High</option>
            <option value="descrating">Rating - High to Low</option>
            <option value="ascname">Name - A to Z</option>
            <option value="descname">Name - Z to A</option>
          </select>
        </div>
      </div>

   
      <p className="text-sm mb-2">
        Showing {paginatedProducts.length} of{" "}
        {filteredAndSortedProducts.length} products
      </p>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((pro) => (
          <ProductCard
            key={pro.id}
            product={pro}
            onClick={() =>
              router.push(`/products/${pro.id}?page=${currentPage}`)
            }
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-2 border rounded disabled:opacity-40"
          >
            <ChevronFirst />
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            className="p-2 border rounded disabled:opacity-40"
          >
            <ChevronLast />
          </button>
        </div>
      )}
    </main>
  );
};

export default ProductsClient;
