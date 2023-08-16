import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { ErrorPage } from "./pages/error/ErrorPage.tsx";
import { AuthPage } from "./pages/auth/AuthPage.tsx";
import { DashboardPage } from "./pages/dashboard/DashboardPage.tsx";
import { Profile } from "./pages/profile/Profile.tsx";
import { DetailsPage } from "./pages/details/DetailsPage.tsx";
import { FavoritePage } from "./pages/favorite/FavoritePage.tsx";
import { SearchPage } from "./pages/search/SearchPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "details/:movieId",
        element: <DetailsPage />,
      },
      {
        path: "favorite",
        element: <FavoritePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  //only match this when no other routes match
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
