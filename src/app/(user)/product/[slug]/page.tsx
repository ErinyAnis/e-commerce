import { groq } from "next-sanity";
import { ProductData } from "../../../../../type";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getBestSellersData } from "@/lib/getData";
import FormattedPrice from "@/components/FormattedPrice";
import { MdStar } from "react-icons/md";
import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";

interface Props {
  params: {
    slug: string;
  };
}

const SingleProductPage = async ({ params: { slug } }: Props) => {
  // Fetch product data based on slug
  const query = groq`*[_type == "product" && slug.current == $slug][0]{
    ...,
    category[]->{
      title,
    }
  }`;

  const product: ProductData | null = await client.fetch(query, { slug });
  const bestsellersData: ProductData[] = await getBestSellersData();

  if (!product) {
    return (
      <Container>
        <p>Product not found. Please check the URL or try again later.</p>
      </Container>
    );
  }

  return (
    <>
      <div className="bg-bgLight py-10">
        <Container>
          <div className="grid lg:grid-cols-3 gap-5 h-full p-4">
            <div className="h-full lg:col-span-1">
              {product.image ? (
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="h-full w-full object-contain bg-white max-h-[300px] lg:max-h-full"
                />
              ) : (
                <p>No product image available.</p>
              )}
            </div>
            <div className="w-full lg:col-span-2 xl:col-span-2 xl:p-14 flex flex-col gap-4 lg:gap-6 justify-center">
              <div className="flex flex-col gap-4 lg:gap-5">
                <h2 className="text-2xl lg:text-4xl font-semibold">{product?.title}</h2>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-normal text-gray-500 line-through">
                    <FormattedPrice amount={product?.rowprice} />
                  </p>
                  <FormattedPrice
                    amount={product?.price}
                    className="text-lg font-bold"
                  />
                  <p className="text-sm">
                    you saved
                    <span className="mx-1.5">
                      <FormattedPrice
                        amount={product?.rowprice - product?.price}
                        className="bg-green-600 text-white px-2 rounded-md text-sm py-1"
                      />
                    </span>
                    from this item
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-base text-lightText flex items-center">
                    {Array?.from({ length: 5 })?.map((_, index) => {
                      const filled =
                        index + 1 <= Math.floor(product?.ratings);
                      const halfFilled =
                        index + 1 > Math.floor(product?.ratings) &&
                        index < Math.ceil(product?.ratings);
                      return (
                        <div
                          key={index}
                          className="relative w-5 h-4 flex items-center justify-center"
                        >
                          <MdStar
                            className="text-lightText absolute"
                            style={{ fontSize: "20px" }}
                          />
                          {filled || halfFilled ? (
                            <MdStar
                              className="absolute"
                              style={{
                                fontSize: "20px",
                                color: "#fa8900",
                                clipPath: halfFilled
                                  ? `inset(0 ${100 - (product?.ratings % 1) * 100}% 0 0)`
                                  : "none",
                              }}
                            />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm font-semibold text-accent/60 tracking-wide">{`(5 customers reviews)`}</p>
                </div>
                <p className="text-sm tracking-wide text-gray-600">
                  {product?.description}
                </p>
                <div className="flex flex-col md:flex-row gap-2 md:gap-7 md:items-center ">
                  <div className="flex gap-2">
                    <h4 className="text-base font-medium">Brand:</h4>
                    <span>{product?.brand ? product?.brand : "unknown"}</span>
                  </div>
                  {product?.category?.map((cat, index) => (
                    <div key={index} className="flex gap-2">
                      <h4 className="text-base font-medium">Category:</h4>
                      <span>{cat?.title}</span>
                    </div>
                  ))}
                </div>
                <AddToCartButton item={product} className="rounded-md py-3" />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container className="py-12">
        <h3 className="mb-4 font-semibold text-xl">Best Sellers Products:</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestsellersData?.map((item) => (
            <ProductCard key={item?._id} item={item} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default SingleProductPage;
