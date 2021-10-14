import "./signUpForm.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const TestSignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("testUsername");
  const [email, setEmail] = useState("test@email.com");
  const [password, setPassword] = useState("password");
  const [repeatPassword, setRepeatPassword] = useState("password");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [fname, setFname] = useState("testFname");
  const [lname, setLname] = useState("testLname");
  const [bio, setBio] = useState("testBio");
  const [pronouns, setPronouns] = useState("He/Him");

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", image);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("bio", bio);
      formData.append("pronouns", pronouns);

      // setImageLoading(true);

      const data = await dispatch(signUp(formData));

      // setImageLoading(false);

      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFname = (e) => {
    setFname(e.target.value);
  };

  const updateLname = (e) => {
    setLname(e.target.value);
  };

  const updatePronouns = (e) => {
    setPronouns(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];

    setImage(file);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form className="outerContainer" onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div className="topInnerContainer">
        <div className="title logo">Kilogram</div>

        <div className="subtitle">Sign up to see photos from your friends.</div>

        <div className="btnContainer">
          <button className="demoBtn">Log in as Demo User</button>
        </div>

        <div className="divisorContainer">
          <span className="middleDivisor">OR</span>
        </div>

        <div className="inputsContainer text-field">
          <div>
            <input
              className="inputContainer inputText"
              type="text"
              placeholder="Username"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>

          <div>
            <input
              className="inputContainer inputText"
              type="text"
              placeholder="Email"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>

          <div>
            <input
              className="inputContainer"
              type="text"
              placeholder="First Name"
              onChange={updateFname}
              value={fname}
              placeholder="First Name"
            ></input>
          </div>

          <div>
            <input
              className="inputContainer"
              type="text"
              placeholder="Last Name"
              onChange={updateLname}
              value={lname}
              placeholder="Last name"
            ></input>
          </div>

          <div>
            <select
              className="inputContainer"
              type="text"
              onChange={updatePronouns}
              value={pronouns}
            >
              <option value={null}>Pronouns</option>

              <option value="He/Him">He/Him</option>

              <option value="She/her">She/Her</option>

              <option value="They/Them">They/Them</option>

              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <input
              className="inputContainer"
              type="text"
              placeholder="Bio"
              onChange={updateBio}
              value={bio}
            ></input>
          </div>

          <div className="uploadDiv fileinputs">
            <input
              className="inputContainer file"
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <div class="inputContainer fakefile">
              <label className="uploadLabel">Upload Profile Picture</label>
              <div className="uploadPic">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <input
              className="inputContainer"
              type="password"
              placeholder="Password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>

          <div>
            <input
              className="inputContainer"
              type="password"
              placeholder="Repeat Password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
        </div>

        <div className="btnContainer2">
          <button type="submit" className="signUpBtn">
            Sign Up
          </button>
        </div>

        <div className="policyContainer">
          By signing up, you agree to our{" "}
          <span className="em">Terms, Data Policy</span> and{" "}
          <span className="em">Cookies Policy</span>.
        </div>
      </div>

      <div className="lowerInnerContainer">
        Have an account?
        <a href="/login" className="link">
          Log in
        </a>
      </div>
    </form>
  );
};

export default TestSignUpForm;
