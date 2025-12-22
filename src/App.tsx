import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import SummaryApi from "./common";
import { useEffect } from "react";
import { currentUserContext } from "./context";

function App() {
  const fetchUserData = async () => {
    return await fetch(SummaryApi.currentUser.url, {
      method: SummaryApi.currentUser.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <currentUserContext.Provider value={{ fetchUserData }}>
      <>
        <Header />
        <main className="min-h-[calc(100vh-100px)]">
          <Outlet />
        </main>
        <Toaster />
        <Footer />
      </>
    </currentUserContext.Provider>
  );
}

export default App;
