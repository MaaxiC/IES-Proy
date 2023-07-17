import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./context/usercontext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Users/login";
import { NavBar } from "./components/Others/navbar";
//Users
import { NewUser } from "./components/Users/newUser";
import { UserTable } from "./components/Users/userList";
import { ConsultProduct } from "./components/e-commerce/consultProduct";
import { Dashboard } from "./components/e-commerce/dashboard";
import { Order } from "./components/e-commerce/order";
import { Brand } from "./components/e-commerce/brands";
import { Category } from "./components/e-commerce/categories";
import { Transaction } from "./components/e-commerce/transaction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedRoute } from "./components/protectedRoutes/protectedRoutes";
import { AboutUs } from "./components/e-commerce/about";
import  Charts  from "./components/Others/charts";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route element={<ProtectedRoute isAllowed={localStorage.getItem('user')} />}>
              <Route
                path="/e-commerce/dashboard"
                element={
                  <>
                    <NavBar />
                    <Dashboard />
                  </>
                }
              ></Route>
              <Route
                path="/Users/newUser"
                element={
                  <>
                    <NavBar />
                    <NewUser />
                  </>
                }
              ></Route>
              <Route
                path="/Users/userList"
                element={
                  <>
                    <NavBar />
                    <UserTable />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/consultProduct"
                element={
                  <>
                    <NavBar />
                    <ConsultProduct />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/order"
                element={
                  <>
                    <NavBar />
                    <Order />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/brands"
                element={
                  <>
                    <NavBar />
                    <Brand />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/categories"
                element={
                  <>
                    <NavBar />
                    <Category />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/transaction"
                element={
                  <>
                    <NavBar />
                    <Transaction />
                  </>
                }
              ></Route>
              <Route
                path="/e-commerce/about"
                element={
                  <>
                    <NavBar />
                    <AboutUs />
                  </>
                }
              ></Route>
              <Route
                path="/Others/chartTest"
                element={
                  <>
                    <NavBar />
                    <Charts />
                  </>
                }
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  </>
);
