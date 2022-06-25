import "../src/styles/index.css";
import { createRoot } from "react-dom/client";
import RouteSwitch from "./Routeswitch";
import { store } from "./app/store";
import { Provider } from "react-redux";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
 <Provider store={store}>
  <RouteSwitch />
 </Provider>
);
