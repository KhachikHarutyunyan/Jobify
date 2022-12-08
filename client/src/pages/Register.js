import { FormRow, Logo, Alert } from "../components";
import {Navigate, useNavigate} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
}

const Register = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState);
    const {user, isLoading, showAlert, displayAlert, setupUser, token} = useAppContext();

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember});
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const {name, email, password, isMember} = values;
        
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return;
        }
        const currentUser = {name, email, password};

        if (isMember) {
            // loginUser(currentUser);
            setupUser({currentUser, endPoint: "login", alertText: "Login Successful! Redirecting..."});
        } else {
            // registerUser(currentUser);
            setupUser({currentUser, endPoint: "register", alertText: "User Created! Redirecting..."});
        }
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [user, navigate]);

    
    if (token) {
        return <Navigate to="/"/>
    }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login": "Register"}</h3>

        { showAlert && <Alert /> }
        {/* name input */}
        {
            !values.isMember && (
                <FormRow handleChange={handleChange} type="text" name="name" value={values.name} />
            )
        }
        {/* email input */}
        <FormRow handleChange={handleChange} type="email" name="email" value={values.email} />
        {/* password input */}
        <FormRow handleChange={handleChange} type="password" name="password" value={values.password} />

        <button type="submit" className="btn btn-block" disabled={isLoading}>submit</button>
        <p>
            { values.isMember ? "Not a member yet?": "Already a member?" }
            <button type="button" onClick={toggleMember} className="member-btn">
                {values.isMember? "Register": "Login"}
            </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
