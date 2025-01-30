"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetails } from "@/context/UserDetails";
import { MessgaesDetails } from "@/context/MessagesDetails";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import SideBar from "@/components/custom/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ActionConetext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";


function Provider({ children }) {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const [click , setClick] = useState();
  const router = useRouter();
  const convex = useConvex();

  useEffect(() => {
    isAuth();
  }, []);

  const isAuth = async () => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user){
        router.push('/')
        return;
      }
      const result = await convex.query(api?.users?.GetUser, {
        email: user?.email,
      });

      setUserDetail(result);
      // if (user) {
      //   setUserDetail(user);
      // }
    }
  };

  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_KEY}
      >
        <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        <UserDetails.Provider value={{ userDetail, setUserDetail }}>
          <MessgaesDetails.Provider value={{ messages, setMessages }}>
            <ActionConetext.Provider value={{click , setClick}}>
            <NextThemesProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <SidebarProvider defaultOpen={false}>
              
                {children}
                
                <SideBar />
              </SidebarProvider>
            </NextThemesProvider>
            </ActionConetext.Provider>
          </MessgaesDetails.Provider>
        </UserDetails.Provider>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </div>
  );
}
export default Provider;
