import { ConfigProvider as AntdConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorPage from "./pages/error";
import Admin from "./pages/admin";
import Home from "./pages/user/home";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import ProductType from "./pages/user/productType";
import Product from "./pages/user/product";
import CartCustom from "./pages/user/cart";
import Checkout from "./pages/user/checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import configs from "./config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000,
      retry: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/iphone" element={<ProductType />} />
      <Route path="/ipad" element={<ProductType />} />
      <Route path="/mac" element={<ProductType />} />
      <Route path="/sound" element={<ProductType />} />
      <Route path="/accessory" element={<ProductType />} />
      <Route path="/watch" element={<ProductType />} />
      <Route path="/iphone/:id" element={<Product />} />
      <Route path="/ipad/:id" element={<Product />} />
      <Route path="/mac/:id" element={<Product />} />
      <Route path="/sound/:id" element={<Product />} />
      <Route path="/accessory/:id" element={<Product />} />
      <Route path="/watch/:id" element={<Product />} />
      <Route path="/cart" element={<CartCustom />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const theme = {
  token: {
    colorPrimary: "#101010",
  },
  components: {
    Form: {
      labelFontSize: "1rem",
    },
    Button: {
      colorPrimaryHover: "#3e3e3f",
    },
    Input: {
      activeBorderColor: "#101010",
      hoverBorderColor: "#3e3e3f",
    },
    InputNumber: {
      activeBg: "#fff",
      hoverBg: "#fff",
    },
    Table: {
      rowSelectedBg: "rgba(0, 0, 0, 0.2)",
      rowSelectedHoverBg: "rgba(0, 0, 0, 0.4)",
    },
  },
};

function App() {
  return (
    <PayPalScriptProvider
      options={{ clientId: configs.CLIENT_ID, currency: "USD" }}
    >
      <AntdConfigProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <RouterProvider router={router} />
            <Suspense fallback={null}></Suspense>
          </RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AntdConfigProvider>
    </PayPalScriptProvider>
  );
}

export default App;
