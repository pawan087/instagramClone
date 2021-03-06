// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_ALL_USERS = "follows/SET_ALL_USERS";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setAllUsersAction = (users) => ({
  type: SET_ALL_USERS,
  payload: users,
});

const initialState = { user: null, allUsers: null };

// ==================================================================
// ==========================USER THUNKS=============================
// ==================================================================

export const setAllUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/");

  if (response.ok) {
    const data = await response.json();

    dispatch(setAllUsersAction(data));
  } else return "SET ALL USERS THUNK ERROR: BAD REQUEST";
};

// ==================================================================
// ====================USER AUTHENTICATION===========================
// ==================================================================

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();

    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(setUser(data));

    return null;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (signUpData) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: signUpData,
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(setUser(data));

    return null;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const profileEdit = (editProfileData) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "PUT",
    body: editProfileData,
  });

  // headers: { "Content-Type": "application/json" },
  // body: JSON.stringify(editProfileData),

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const avatarEdit = (avatarEditData) => async (dispatch) => {
  const response = await fetch("/api/auth/signup/avatar", {
    method: "PUT",
    body: avatarEditData,
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

// ==================================================================
// =======================FOLLOWING THUNKS===========================
// ==================================================================

export const addFollow = (follow) => async (dispatch) => {
  const response = await fetch("/api/users/following/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(follow),
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(setAllUsers(data));
  } else return "ADD FOLLOW THUNK FAILED!";
};

export const deleteFollow = (follow) => async (dispatch) => {
  const response = await fetch("/api/users/following/", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(follow),
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(setAllUsers(data));
  } else return "DELETE FOLLOW THUNK FAILED!";
};

// ==================================================================
// ===========================SAVED THUNKS===========================
// ==================================================================

export const addSavedImage = (user_id, image_id) => async (dispatch) => {
  const response = await fetch(`/api/images/saved/${user_id}/${image_id}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(setUser(data));
  } else return "ADD FOLLOW THUNK FAILED!";
};

export const deleteSavedImage = (user_id, image_id) => async (dispatch) => {
  const response = await fetch(`/api/images/saved/${user_id}/${image_id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(setUser(data));
  } else return "ADD FOLLOW THUNK FAILED!";
};

export const updateUser = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/users/${user_id}`);

  if (response.ok) {
    const data = await response.json();

    dispatch(setUser(data));
  } else return "ADD FOLLOW THUNK FAILED!";
};

// ==================================================================
// ============================REDUCER===============================
// ==================================================================

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload, allUsers: state.allUsers };
    case REMOVE_USER:
      return { user: null };
    case SET_ALL_USERS:
      return { user: state.user, allUsers: action.payload.users };
    default:
      return state;
  }
}
