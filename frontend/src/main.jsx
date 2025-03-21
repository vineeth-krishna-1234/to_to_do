import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </StrictMode>
);
