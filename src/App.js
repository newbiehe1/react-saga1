import "./App.css";
import Temp from "./components/main/index.jsx";
import { Provider } from "react-redux";
import store from "./store/root";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Temp />
            </Provider>
        </div>
    );
}

export default App;
