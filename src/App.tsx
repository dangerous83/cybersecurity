import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { WalletProvider } from "./contexts/WalletContext";
import { PriceProvider } from "./contexts/PriceContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Trade from "./pages/Trade";
import Markets from "./pages/Markets";
import Futures from "./pages/Futures";
import Earn from "./pages/Earn";
import NFT from "./pages/NFT";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wallet from "./pages/Wallet";
import Convert from "./pages/Convert";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/cybersecurity">
        <AuthProvider>
          <PriceProvider>
            <WalletProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/trade" element={<Trade />} />
                  <Route path="/markets" element={<Markets />} />
                  <Route path="/futures" element={<Futures />} />
                  <Route path="/earn" element={<Earn />} />
                  <Route path="/nft" element={<NFT />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/convert" element={<Convert />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </WalletProvider>
          </PriceProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
