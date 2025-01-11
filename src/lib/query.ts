import { groq } from "next-sanity";

const bannerQuery = groq`*[_type == "banner"]{
    ...
}|order(_createdAt asc)`;

const productsQuery = groq`*[_type == "product"]{
  title,
  image,
  quantity,
  price,
  category[]->{
    title
  },
  slug,
  _createdAt,
  description,
  _updatedAt,
  ratings,
  brand,
  _id,
  position,
  rowprice
} | order(_createdAt asc)`;


const bestSellersQuery = groq`*[_type == "product" && position == "Bestsellers"]{
    ...
}|order(_createdAt asc)`;

export { bannerQuery, productsQuery, bestSellersQuery };
