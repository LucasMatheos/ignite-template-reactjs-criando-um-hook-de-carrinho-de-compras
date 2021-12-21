import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const prevCartRef = useRef<Product[]>();

  useEffect(() => {
    prevCartRef.current = cart;
  });

  const previewCart = prevCartRef.current ?? cart; // Caso prev seja undefined

  useEffect(() => {
    if (previewCart !== cart) {
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(cart));
    }
  }, [cart, previewCart]);

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart];
      const stock = await api.get<Stock>(`/stock/${productId}`);
      const stockAmount = stock.data.amount;
      const getProduct = await api.get<Product>(`/products/${productId}`);
      const product = getProduct.data;

      const productExist = updatedCart.find(
        (product) => product.id === productId
      );

      if (productExist) {
        if (productExist.amount >= stockAmount) {
          toast.error("Quantidade solicitada fora de estoque");
          return;
        } else {
          productExist.amount += 1;
        }
      } else {
        const updatedProduct = { ...product, amount: 1 };
        updatedCart.push(updatedProduct);
      }

      setCart(updatedCart);
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productExist = cart.find((product) => product.id === productId);
      if (productExist) {
        const updatedCart = [...cart];
        const removeProduct = updatedCart.filter(
          (product) => product.id !== productId
        );

        setCart(removeProduct);
      } else {
        toast.error("Erro na remoção do produto");
        return;
      }
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      console.log(productId, amount);
      const updatedCart = [...cart];
      const productExist = updatedCart.find(
        (product) => product.id === productId
      );
      if (productExist) {
        const stock = await api.get<Stock>(`/stock/${productId}`);
        if (
          productExist.amount >= stock.data.amount &&
          amount >= stock.data.amount
        ) {
          toast.error("Quantidade solicitada fora de estoque");
        } else if (amount <= 1) {
          return;
        } else {
          productExist.amount = amount;
          setCart(updatedCart);
        }
      } else {
        toast.error("Erro na alteração de quantidade do produto");
        return;
      }
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
