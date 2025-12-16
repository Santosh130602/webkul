"use client";

import Image from "next/image";
import { Product } from "../../types/index";
import { Star } from "lucide-react";


type Props = {
  product: Product;
  onClick?: (id: number) => void;
  descriptionLength?: number;
};

export default function ProductCard({
  product,
  onClick,
  descriptionLength = 120,
}: Props) {
  const { id, title, price, description, category, image, rating } = product;

  const stars = Math.round(rating?.rate ?? 0);
  const emptyStars = Math.max(0, 5 - stars);

  const truncated =
    description.length > descriptionLength ? description.slice(0, descriptionLength).trimEnd() + "..." : description;

  return (
    <article onClick={() => onClick?.(id)} className="p-4 bg-white  shadow-sm hover:shadow-md transition-shadow cursor-pointer" aria-labelledby={`product-${id}-title`} >
      <div className="w-full aspect-[4/3] bg-gray-100  overflow-hidden mb-4 relative">
        <Image src={image} alt={title} priority fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: "contain" }} />
      </div>

      <header>
        <h2 id={`product-${id}-title`} className="text-lg font-semibold text-gray-800 mb-1">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mb-2">{category}</p>
      </header>

      <p className="text-sm text-gray-600 mb-3">{truncated}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center" aria-hidden title={`${rating?.rate ?? 0} / 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}/>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({rating?.count ?? 0})
            </span>
          </div>
          <span className="text-sm text-gray-500">({rating?.count ?? 0})</span>
        </div>

      </div>
      <div className="text-lg font-bold text-gray-800">${price.toFixed(2)}</div>
    </article>
  );
}
