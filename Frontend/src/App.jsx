import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import ThemeProvider from "./Components/themeProvider";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import YourBlog from "./pages/YourBlog";
import CreateBlog from "./pages/CreateBlog";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import UpdateBlog from "./pages/UpdateBlog";
import BlogView from "./pages/BlogView";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/blogs/:blogId", element: <BlogView /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "your-blogs", element: <YourBlog /> },
          { path: "create-blog", element: <CreateBlog /> },
          { path: "create-blog/:blogId", element: <UpdateBlog /> },
        ]
      },
    ]
  }
])

// React-Persist :- 1. Normally, Redux state resets when you reload the page. With redux-persist, the store is saved to persistent storage (like localStorage or sessionStorage) and automatically restored when the app loads.
//  2.  It handles converting Redux state into a storable format (JSON) and rehydrating (restoring previously saved state back into your Redux store when the app starts) it back into the store without manual coding.
// idea: -  use it when your app needs to remember important state across reloads or sessions without forcing users to start over.


const persistor = persistStore(store);

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          {/* “Auth is pure state so Redux alone is enough, but theming requires a context provider because UI libraries read theme values from <ThemeProvider>.” */}
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App