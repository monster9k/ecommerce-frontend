import { useEffect, useState } from "react";
import CartItems from "../../components/layout/user/cart/CartItems";
import CartSummary from "../../components/layout/user/cart/CartSummary";
import Footer from "../../components/layout/user/home/Footer";
import Newsletter from "../../components/layout/user/home/Newsletter";
import { getCartApi } from "../../utils/cartApi";

const CartPage = () => {
  const [cartData, setCartData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCartApi();

      setCartData(res?.data?.items); // data chứa { id, items: [...] }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-white mt-16">
      <main className="max-w-6xl mx-auto px-4">
        <h1 className="!text-3xl !font-extrabold">YOUR CART</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <CartItems cartData={cartData} />
          <CartSummary />
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default CartPage;
