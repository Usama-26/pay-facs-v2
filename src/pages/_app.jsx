import { AdminProvider } from "@/context/AdminProvider";
import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <main className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools />
        <Toaster toastOptions={{ duration: 4000 }} />
      </AdminProvider>
    </QueryClientProvider>
  );
}
