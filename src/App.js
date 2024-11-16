import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Pages from "./Pages.jsx";
import Header from "./components/header/Header.jsx";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    useEffect(() => {
        document.title = 'Innoviant';
    }, []);

  return (
      <div>
          <BrowserRouter>
              <Header />
              <Pages />
          </BrowserRouter>

          <ToastContainer/>
      </div>
  );
}

export default App;
