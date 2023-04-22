import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import Meta from "../components/Meta";
import UserContext from "../components/UserContext";
import { useRef, useState } from "react";
import { client } from "../wagmi";
import { WagmiConfig } from "wagmi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function MyApp({ Component, pageProps }) {
  const scrollRef = useRef({
    scrollPos: 0,
  });

  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Meta title="Home" />

      <Provider store={store}>
        <WagmiConfig client={client}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ThemeProvider enableSystem={false} attribute="class">
                <UserContext.Provider value={{ scrollRef: scrollRef }}>
                  <Layout>
                    <ToastContainer
                      theme="dark"
                      hideProgressBar
                      draggableDirection="x"
                      position="bottom-right"
                    />
                    <Component {...pageProps} />
                  </Layout>
                </UserContext.Provider>
              </ThemeProvider>
            </Hydrate>
          </QueryClientProvider>
        </WagmiConfig>
      </Provider>
    </>
  );
}

export default MyApp;
