import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import checkValidateData from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { updateProfile } from "firebase/auth";

function SignUp() {
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function goToSignInForm() {
        navigate("/login");
    }

    const handleChange = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const message = checkValidateData(email, password);
        setErrorMsg(message);

    }

    const handleSignUp = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const message = checkValidateData(email, password);
        setErrorMsg(message);
        if (message) return;

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                await updateProfile(user, {
                    displayName: name
                });

                dispatch(addUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: name
                }));
                navigate("/home");
            })
            .catch((error) => {
                setErrorMsg("Already ");
            });
    }


    return (
        <div className="flex justify-center w-screen h-screen bg-yellow-100 ">
            <form onSubmit={handleSignUp} noValidate className="flex mt-10 flex-col p-10 h-[500px] w-[450px] bg-white items-center gap-2 rounded-2xl">

                <div>
                    <label className="block text-lg text-black font-semibold mb-1">Name</label>
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        className="border p-2 w-80 rounded"
                    />
                </div>

                <div>
                    <label className="block text-lg text-black font-semibold mb-1">Email</label>
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        className="border p-2 w-80 rounded"
                    />
                </div>

                <div>
                    <label className="block text-lg text-black font-semibold mb-1">Password</label>
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        className="border p-2 w-80 rounded"
                    />
                </div>
                {errorMsg && (
                    <p className="text-red-600 mt-2 font-semibold">
                        {errorMsg}
                    </p>
                )}

                <button type="submit" className="w-72 h-10 mt-6 bg-green-700 rounded text-white font-semibold">
                    Sign Up
                </button>

                <button type="button" onClick={goToSignInForm}><p className="text-red-600 mt-4">Already have an account? Sign In now</p></button>


            </form>
        </div>
    );
}

export default SignUp;