"use client";

import * as React from "react";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Amplify } from "aws-amplify";
import { useRouter } from "next/navigation";
import ResponsiveAppBar from "./UI/AppBar/AppBar";
import theme from "./UI/theme";
import { AgentProvider } from "./context/AgentContext";
import awsconfig from "../aws-exports";
import { UserProvider, useUser } from "./context/UserContext";

Amplify.configure(awsconfig);

function AppLayout({ children }) {
  const router = useRouter();
  const { currentUser } = useUser();

  console.log("User from Layout: ", currentUser);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (currentUser === undefined) {
      console.log("User undefined, redirecting to login...");
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <>
      {currentUser ? <ResponsiveAppBar userRole={currentUser} /> : null}
      {children}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AgentProvider>
            <UserProvider>
              <AppLayout>{children}</AppLayout>
            </UserProvider>
          </AgentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
