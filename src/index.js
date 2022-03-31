import { StrictMode } from "react";
import ReactDOM from "react-dom";
/* import { StoreContext } from "./contex/StoreContext"; */
import { store } from "./store/store";
import { Provider } from "react-redux";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    {/* <StoreContext>
      <App />
    </StoreContext> */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
