import { useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "../components/Shared/TextInput";
import PasswordInput from "../components/Shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  // console.log(email);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async() => {
    if (email !== confirmEmail) {
      alert
        (
            "Email and confirm email fields must match. Please check again"
        );
      return;
    }
    const data = { email, password, username, firstName, lastName };
    // console.log(data);
    const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);
    if(response && !response.err){
        // console.log(response);
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, {path: "/", expires: date});
        alert("Success");
        navigate("/home");
    }else{
        alert("Failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width="150" />
      </div>
      <div className="inputRegion w-4/5 lg:w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-4 text-2xl">
          Sign up for free start listening.
        </div>
        <TextInput
          label="Email address"
          placeholder="Enter your email"
          className="mb-6"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="Confirm Email Address"
          placeholder="Enter your email again"
          className="mb-6"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <TextInput
          label="Username"
          placeholder="Enter your username"
          className="mb-6"
          value={username}
          setValue={setUsername}
        />
        <PasswordInput
          label="Create Password"
          placeholder="Enter a strong password here"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex flex-col sm:flex-row justify-between items-center space-x-0 sm:space-x-8">
          <TextInput
            label="First Name"
            placeholder="Enter your first name"
            className="my-6"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter your last name"
            className="my-1 sm:my-6"
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <div className="w-full flex items-center justify-center my-10">
          <button
            className="bg-green-400 text-lg font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-semibold text-lg">
          Already have an have an account?
        </div>
        <div className="border border-gray-500 w-full text-gray-500 font-bold flex items-center justify-center py-4 rounded-full">
          <Link to="/login">LOG IN INSTEAD</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
