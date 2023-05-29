import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StepperFormPage from "./pages/stepper-form";
import ViewJobs from "./pages/view-jobs";
import User from "./pages/user";
import NavBar from "./Components/navbar";

function App() {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StepperFormPage />} />
            <Route path="/jobs/view" element={<ViewJobs />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
