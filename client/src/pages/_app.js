import '@/styles/globals.css'
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store/index';
import { PersistGate } from 'redux-persist/integration/react';
function App({ Component}) {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Component />
      </PersistGate>
    </Provider>
  );
}

export default App;
