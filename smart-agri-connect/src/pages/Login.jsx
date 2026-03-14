import { useNavigate } from "react-router-dom";
import checkValidateData from "../utils/validate.js";
import { useRef, useState } from "react";
import { auth } from "../utils/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { signOut } from "firebase/auth";

function Login() {
    const [errorMsg, setErrorMsg] = useState("");
    const user = useSelector((store) => store.user)


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailRef = useRef(null);
    const passwordRef = useRef(null)

    const goToSignUpForm = () => {
        navigate("/signup")
    }



    const handleInputChange = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const message = checkValidateData(email, password);
        setErrorMsg(message);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const message = checkValidateData(email, password);
        setErrorMsg(message);
        if (message) return;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(addUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                }));
                navigate("/home");
            })
            .catch((error) => {
                setErrorMsg("User is not registered");
            });
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex justify-center w-screen h-screen bg-yellow-100">
            <form noValidate onSubmit={handleLogin} className="flex flex-col w-[400px] h-[450px] items-center  bg-white mt-10 rounded-lg">

                <div className="mt-10">
                    <label className="block text-lg text-black  font-semibold mb-2">Email</label>
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Enter Email"
                        onChange={handleInputChange}
                        className="border p-2 w-80 rounded"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-lg text-black font-semibold mb-2">Password</label>
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Enter Password"
                        onChange={handleInputChange}
                        className="border p-2 w-80 rounded"
                    />
                </div>

                {errorMsg && (
                    <p className="text-red-600 mt-2 font-semibold">
                        {errorMsg}
                    </p>
                )}

                <button type="submit" className="w-72 h-10 mt-6 bg-green-700 rounded text-white font-semibold">
                    Sign In
                </button>

                <button type="button" onClick={goToSignUpForm} ><p className="text-red-600 mt-4">Not have an account?  Sign Up now</p></button>
            </form>
        </div>
    )
}
export default Login;