import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
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

/*   const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState(""); */

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

      setImageLoading(true);

      const data = await dispatch(signUp(formData));

      setImageLoading(false);

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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div>
        <label>User Name</label>

        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>

      <div>
        <label>Email</label>

        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>

      <div>
        <label>First Name</label>

        <input
          type="text"
          onChange={updateFname}
          value={fname}
          placeholder="First Name"
        ></input>
      </div>

      <div>
        <label>Last Name</label>

        <input
          type="text"
          onChange={updateLname}
          value={lname}
          placeholder="Last name"
        ></input>
      </div>

      <div>
        <label>Pronouns</label>

        <select type="text" onChange={updatePronouns} value={pronouns}>
          <option value={null}>Prefer Not To Disclose</option>

          <option value="He/Him">He/Him</option>

          <option value="She/her">She/Her</option>

          <option value="They/Them">They/Them</option>

          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label>Bio</label>

        <textarea
          onChange={updateBio}
          value={bio}
          placeholder="Write a short biography!"
        ></textarea>
      </div>

      <div>
        <label>Password</label>

        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>

      <div>
        <label>Repeat Password</label>

        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>

      <div>
        <label>Profile Photo</label>

        <input type="file" accept="image/*" onChange={updateImage} />

        {imageLoading && <p>Loading...</p>}
      </div>


      <button type="submit">Sign Up</button>
      </form>
      );
    };

    export default SignUpForm;