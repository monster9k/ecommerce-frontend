import CartItems from "../../components/layout/user/cart/CartItems";
import CartSummary from "../../components/layout/user/cart/CartSummary";
import Footer from "../../components/layout/user/home/Footer";
import Newsletter from "../../components/layout/user/home/Newsletter";

const CartPage = () => {
  return (
    <div className="min-h-screen bg-white mt-16">
      <main className="max-w-6xl mx-auto px-4">
        <h1 className="!text-3xl !font-extrabold">YOUR CART</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <CartItems />
          <CartSummary />
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default CartPage;
