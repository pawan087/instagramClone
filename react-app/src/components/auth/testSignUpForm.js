import React from "react";
import "./signUpForm.css";

export default function testSignUpForm() {
  return (
    <div className="outerContainer">
      <div className="topInnerContainer">
        <div className="title">Instagram</div>

        <div className="subtitle">
          Sign up to see photos and videos from your friends.
        </div>

        <div className="btnContainer">
          <button className="demoBtn">Log in as Demo User</button>
        </div>

        <div className="divisor">OR</div>

        <div className="inputContainer">
          <input type="text" placeholder="Email"></input>
        </div>

        <div className="inputContainer">
          <input type="text" placeholder="First Name"></input>
        </div>

        <div className="inputContainer">
          <input type="text" placeholder="Last Name"></input>
        </div>

        <div className="inputContainer">
          <input type="text" placeholder="Bio"></input>
        </div>

        <div className="inputContainer">
          <select type="text">
            <option value={null}>Pronouns</option>

            <option value="He/Him">He/Him</option>

            <option value="She/her">She/Her</option>

            <option value="They/Them">They/Them</option>

            <option value="Other">Other</option>
          </select>
        </div>

        <div className="inputContainer">
          <input type="text" placeholder="Password"></input>
        </div>

        <div className="inputContainer">
          <input type="text" placeholder="Repeat Password"></input>
        </div>

        <div className="btnContainer">
          <button>Sign Up</button>
        </div>

        <div className="policyContainer">
          By signing up, you agree to our Terms, Data Policy and Cookies Policy.
        </div>
      </div>

      <div className="lowerInnerContainer">Have an account? Log in</div>
    </div>
  );
}
