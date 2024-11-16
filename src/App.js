import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Pages from "./Pages.jsx";
import Header from "./components/header/Header.jsx";

function App() {
    useEffect(() => {
        document.title = 'Innoviant';
    }, []);

  return (
    <BrowserRouter>
        <Header/>
        <Pages/>
    </BrowserRouter>
  );
}

export default App;
