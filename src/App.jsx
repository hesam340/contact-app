import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import DetailsPage from "components/templates/DetailsPage";
import PageNotFound from "components/templates/404Page";
import EditPage from "components/templates/EditPage";
import HomePage from "components/templates/HomePage";
import AddPage from "components/templates/AddPage";
import UserProvider from "context/UserContext";
import FormProvider from "context/FormContext";
import Layout from "components/layout/Layout";

function App() {
  return (
    <UserProvider>
      <FormProvider>
        <Layout>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Layout>
        <ToastContainer position="top-center" autoClose={3000} />
      </FormProvider>
    </UserProvider>
  );
}

export default App;
