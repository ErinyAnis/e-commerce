import AllProducts from "@/components/AllProducts";
import Container from "@/components/Container";

const ShopPage = () => {
  return (
    <Container className="py-5">
      <h2 className="text-2xl font-semibold mb-5">All Available product list:</h2>
      <AllProducts />
    </Container>
  )
}

export default ShopPage;