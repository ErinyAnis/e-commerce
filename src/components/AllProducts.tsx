import { getProductsData } from "@/lib/getData";
import { ProductData, Category } from "../../type";
import ProductCard from "./ProductCard";

const AllProducts = async () => {
  try {
    const products: ProductData[] = await getProductsData();

    // Group products by category title
    const groupedProducts = products.reduce((acc, product) => {
      product.category.forEach((cat: Category) => {
        const categoryName = cat.title || "Uncategorized"; // Fallback for missing title
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(product);
      });
      return acc;
    }, {} as Record<string, ProductData[]>);

    return (
      <div>
        {Object.entries(groupedProducts).map(([categoryName, products]) => (
          <div key={categoryName} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-darkOrange">{categoryName}:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);

    return (
      <div>
        <p className="text-red-600">Failed to load products. Please try again later.</p>
      </div>
    );
  }
};

export default AllProducts;
