import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const EditProfileForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [bio, setBio] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onProfileEdit = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, avatar, fname, lname, bio, pronouns));
      if (data) {
        setErrors(data)
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
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onProfileEdit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
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
          <option value="She/her">She/Her</option>
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
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
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
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default EditProfileForm;
