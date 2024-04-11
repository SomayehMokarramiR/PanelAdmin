import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import {store} from "../src/redux/store"


const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false, staleTime: 1000 * 5 * 6 },
      mutations: {},
    },
  });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>
          <Router />
        </Suspense>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
