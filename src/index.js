// index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
import { AuthProvider } from "./authContext/AuthContext";
import { SubscriptionProvider } from "./authContext/SubscriptionProvider";
import "animate.css";
import "swiper/swiper-bundle.min.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";

const RootComponent = () => {
  return (
    <Provider store={store}>
      <PersistProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <App />
          </SubscriptionProvider>
        </AuthProvider>
      </PersistProvider>
    </Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RootComponent />);
