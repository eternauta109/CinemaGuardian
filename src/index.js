/* import { StrictMode } from "react"; */
import ReactDOM from "react-dom";
/* import { StoreContext } from "./contex/StoreContext"; */
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

console.log("store", store);
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootElement
);
