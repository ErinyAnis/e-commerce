import Container from "@/components/Container";
import { groq } from "next-sanity";
import { ProductData } from "../../../../../type";
import { client } from "@/sanity/lib/client";

interface Props {
  params: {
    slug: string;
  };
}

const SingleProductPage = async ({ params: { slug } }: Props) => {
  //  (*) : It tells Sanity to retrieve all documents that match the criteria defined within the square brackets [ ]
  const query = groq`*[_type == "product" && slug.current == $slug][0] {
  ...
  }`;

  const product: ProductData = await client.fetch(query, { slug });
  console.log(product);

  return <Container>SingleProductPage</Container>;
};

export default SingleProductPage;
