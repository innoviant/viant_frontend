import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Pages from "./Pages.jsx";

function App() {
    useEffect(() => {
        document.title = 'Innoviant';
    }, []);

  return (
    <BrowserRouter>
        <Pages/>
    </BrowserRouter>
  );
}

export default App;
