import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useStateValue } from "../context/stateContext";
import "../css/login.css";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      dispatch({
        type: "SET_USER",
        user: result.user,
      });
    }).catch((err)=>console.log(err.message));
  };

  return (
    <div className="login_wrapper">
      <div className="login">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"
          alt="WhatsApp logo"
        />
        <h2>Sign in to WhatsApp</h2>
        <button onClick={signIn}>Loggin with Gmail</button>
      </div>
    </div>
  );
};

export default Login;
