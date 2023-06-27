import '@/styles/globals.css'
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';

// const Wrapper = ({children})=>{
//   // role
//   useEffect(()=>{
//     if(role){
//       r
//     }
//   },[])
//   return children
// }
function App({ Component, pageProps}) {

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <Wrapper> */}
      <Component {...pageProps}  />
      {/* </Wrapper> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
