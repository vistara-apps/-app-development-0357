import { useWalletClient } from "wagmi";
import { useCallback, useState } from "react";
import axios from "axios";
import { withPaymentInterceptor, decodeXPaymentResponse } from "x402-axios";

export function usePaymentContext() {
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const [paymentError, setPaymentError] = useState(null);

  const getErrorMessage = (error) => {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error?.message) {
      return error.message;
    }
    
    return "An unknown error occurred during payment processing";
  };

  const createSession = useCallback(async (amount = "$2") => {
    try {
      setPaymentError(null);
      
      if (!walletClient || !walletClient.account) {
        throw new Error("Please connect your wallet to continue");
      }
      
      if (isError) {
        throw new Error("Wallet connection error. Please reconnect your wallet");
      }
      
      if (isLoading) {
        throw new Error("Wallet is connecting. Please wait a moment");
      }
      
      const baseClient = axios.create({
        baseURL: "https://payments.vistara.dev",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      });
      
      const apiClient = withPaymentInterceptor(baseClient, walletClient);
      
      const response = await apiClient.post("/api/payment", { 
        amount,
        currency: "USD",
        description: "ForgeStream subscription payment"
      });
      
      const paymentResponse = response.config.headers["X-PAYMENT"];
      
      if (!paymentResponse) {
        throw new Error("Payment response is missing. Please try again");
      }
      
      const decoded = decodeXPaymentResponse(paymentResponse);
      console.log(`Payment successful: ${JSON.stringify(decoded)}`);
      
      return decoded;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setPaymentError(errorMessage);
      console.error("Payment error:", error);
      throw new Error(errorMessage);
    }
  }, [walletClient, isError, isLoading]);

  return { 
    createSession,
    paymentError,
    clearPaymentError: () => setPaymentError(null)
  };
}
