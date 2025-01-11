"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SearchResults from "@/components/SearchResults";
import { getProductsData } from "@/lib/getData";
import { ProductData } from "@/type";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") as string;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      // Fetch products based on the search query
      const fetchData = async () => {
        const data = await getProductsData();  
        setProducts(data);  // Set the fetched products
      };
      fetchData();
    }
  }, [query]);

  return (
    <Container className="py-7">
      <SearchResults searchQuery={searchQuery} products={products} />
    </Container>
  );
};

export default SearchPage;
