import React from "react";
import "./signUpForm.css";

export default function testSignUpForm() {
  return (
    <div className="outerContainer">
      <div className="topInnerContainer">
        <div className="title logo">Kilogram</div>

        <div className="subtitle">
          Sign up to see photos from your friends.
        </div>

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
              placeholder="Email"
            ></input>
          </div>

          <div>
            <input
              className="inputContainer"
              type="text"
              placeholder="First Name"
            ></input>
          </div>

          <div>
            <input
              className="inputContainer"
              type="text"
              placeholder="Last Name"
            ></input>
          </div>

          <div>
            <input
              className="inputContainer"
              type="text"
              placeholder="Bio"
            ></input>
          </div>

          <div>
            <select className="inputContainer" type="text">
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
              placeholder="Password"
            ></input>
          </div>

          <div>
            <input
              className="inputContainer"
              type="text"
              placeholder="Repeat Password"
            ></input>
          </div>
        </div>

        <div className="btnContainer2">
          <button className="signUpBtn">Sign Up</button>
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
    </div>
  );
}
