import { ProductData } from "../../type";
import ProductCard from "./ProductCard";

interface SearchResultsProps {
  searchQuery: string;
  products: ProductData[];
}

const SearchResults = ({ searchQuery, products }: SearchResultsProps) => {
  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[36vh]">
      {filteredProducts.length > 0 ? ( // 1. Check if there are any filtered products
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        // 2. Render fallback if no results are found
        <div className="text-center text-gray-500 py-24">
          <p>No results found for &quot;{searchQuery}&quot;.</p>
          <p>Try searching for something else!</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
