import { Provider } from "react-redux";

import { FC } from "react";
import { store, persistor } from "@/app/store";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children: React.ReactNode;
}

const AppWrapperProvider: FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default AppWrapperProvider;
