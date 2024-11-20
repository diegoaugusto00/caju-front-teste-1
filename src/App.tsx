import Router from "~/router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/atoms/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDialog from "./components/organisms/ConfirmDialog";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
        <ToastContainer />
        <ConfirmDialog />
      </QueryClientProvider>
    </>
  );
}

export default App;
