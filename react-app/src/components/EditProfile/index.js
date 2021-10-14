import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { profileEdit } from '../../store/session';

const EditProfileForm = () => {
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [bio, setBio] = useState(user.bio);
  const [pronouns, setPronouns] = useState(user.pronouns);
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  const onProfileEdit = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(profileEdit(user.id, username, email, oldPassword, password, avatar, fname, lname, bio, pronouns));
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

  const updateOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (!user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onProfileEdit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      {console.log(errors)}
      <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder="User Name"
          ></input>
        </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder="Email"
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          onChange={(e) => setFname(e.target.value)}
          value={fname}
          placeholder='First Name'
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          onChange={(e) => setLname(e.target.value)}
          value={lname}
          placeholder='Last name'
        ></input>
      </div>
      <div>
        <label>Pronouns</label>
        <select
          type='text'
          onChange={(e) => setPronouns(e.target.value)}
          value={pronouns}
        >
          <option value={null}>Prefer Not To Disclose</option>
          <option value="He/Him">He/Him</option>
          <option value="She/Her">She/Her</option>
          <option value="They/Them">They/Them</option>
          <option value="Other">Other</option>

        </select>
      </div>
      <div>
        <label>Bio</label>
        <textarea
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          placeholder='Write a short biography!'
        ></textarea>
      </div>
      <div>
        <label>Old Password</label>
        <input
          type='password'
          name='old_password'
          onChange={updateOldPassword}
          value={oldPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        {/* If there's a value in the password field require the repeat password, otherwise don't require it */}
        {password ?
        <input
        type='password'
        name='repeat_password'
        onChange={updateRepeatPassword}
        value={repeatPassword}
        required={true}
      ></input>
        :
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
        }
      </div>
      <div>
        <label>Avatar</label>
        <input
          type='text'
          onChange={(e) => setAvatar(e.target.value)}
          value={avatar}
          placeholder='Url to an image'
        ></input>
      </div>
      <button type='submit'>Save Changes</button>
    </form>
  );
};

export default EditProfileForm;
