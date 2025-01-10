import Container from "@/components/Container";
import Orders from "@/components/Orders";


const OrdersPage = () => {
  return (
    <Container className="py-10">
      <h2 className="text-xl lg:text-2xl font-semibold">Your Orders</h2>
      <Orders />
    </Container>
  )
}

export default OrdersPage;