import "./App.css";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Signin from "./components/signin/signin";
import UserPage from "./components/userPage/userPage";
import { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@kenzieHub:token"));
    if (token) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <>
      <ToastContainer
        className="toast"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/">
              <Signin
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                setUsuario={setUsuario}
              />
            </Route>
            <Route path="/signup">
              <Signup authenticated={authenticated} />
            </Route>
            <Route path="/userPage">
              <UserPage authenticated={authenticated} usuario={usuario} />
            </Route>
          </Switch>
        </header>
      </div>
    </>
  );
}

export default App;
