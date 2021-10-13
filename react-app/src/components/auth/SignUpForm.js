import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, avatar));

      const formData = new FormData();

      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", image);

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

  if (user) {
    return <Redirect to="/" />;
  }

  const updateImage = (e) => {
    const file = e.target.files[0];

    setImage(file);
  };

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

      {/*<div>
        <label>Avatar</label>

        <input
          type='text'
          onChange={(e) => setAvatar(e.target.value)}
          value={avatar}
          placeholder='Url to an image'
        ></input>
      </div>*/}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
