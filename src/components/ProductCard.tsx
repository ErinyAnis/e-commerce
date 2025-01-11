import Link from "next/link";
import { ProductData } from "../../type";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { MdStar } from "react-icons/md";
import FormattedPrice from "./FormattedPrice";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ item }: { item: ProductData }) => {
  return (
    <div className="border border-lightText/40 rounded-md relative group overflow-hidden">
      <div className="overflow-hidden">
        <Link href={`/product/${item?.slug.current}`}>
          <Image
            src={urlFor(item?.image).url()}
            alt={item?.title}
            width={400}
            height={400}
            loading="lazy"
            className="w-full h-56 md:h-72 object-contain group-hover:scale-105 hoverEffect"
          />
        </Link>
      </div>
      <div className="px-6 flex flex-col items-center gap-2">
        <div className="text-base text-lightText flex items-center">
          {Array?.from({ length: 5 })?.map((_, index) => {
            const filled = index + 1 <= Math.floor(item?.ratings);
            const halfFilled =
              index + 1 > Math.floor(item?.ratings) &&
              index < Math.ceil(item?.ratings);
            return (
              <div
                key={index}
                className="relative w-6 h-6 flex items-center justify-center"
              >
                {/* Base star for outline */}
                <MdStar className="text-lightText absolute" />
                {/* Filled or partially filled star */}
                {filled || halfFilled ? (
                  <MdStar
                    className="absolute"
                    style={{
                      color: "#fa8900", // Star color
                      clipPath: halfFilled
                        ? `inset(0 ${100 - (item?.ratings % 1) * 100}% 0 0)` // Adjust the percentage for partial stars
                        : "none",
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
        <p className="uppercase text-xs font-medium text-lightOrange">{`${item?.brand ? item.brand : "unknown"}`}</p>
        <h2 className="text-base font-semibold text-accent line-clamp-1">
          {item?.title}
        </h2>
        <p className="text-center text-sm line-clamp-2">{item?.description}</p>
        <div className="flex items-center gap-3 mb-5">
          <FormattedPrice
            amount={item?.rowprice}
            className="text-lightText line-through"
          />
          <FormattedPrice amount={item?.price} className="text-darkOrange font-bold" />
        </div>
      </div>
      <AddToCartButton item={item} />
    </div>
  );
};

export default ProductCard;
