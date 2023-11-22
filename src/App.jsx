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
import Home from "./pages/home";
import ErrorPage from "./pages/error";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin";
import ProductType from "./pages/productType";

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
  },
};

function App() {
  return (
    <AntdConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider router={router} />
          <Suspense fallback={null}></Suspense>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AntdConfigProvider>
  );
}

export default App;
