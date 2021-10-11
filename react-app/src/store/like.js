const SET_LIKE = "likes/SET_LIKES"

const load = (likes) => ({
    type: SET_LIKE,
    payload: likes
})

export const setAllLikes = () => async (dispatch) => {
    const response = await fetch("/api/images/likes")
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "READ THUNK ERROR: BAD REQUEST"
}

const initialState = []
const likeReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_LIKE:
            newState = action.payload.likes
            return newState
        default:
            return state
    }
}

export default likeReducer
