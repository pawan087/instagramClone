const SET_COMMENT = "comments/SET_COMMENT"

const load = (comments) => ({
    type: SET_COMMENT,
    payload: comments
})

export const setComments = () => async (dispatch) => {
    const response = await fetch("/api/comments/")
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "READ THUNK ERROR: BAD REQUEST"
}

const initialState = []
const commentReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_COMMENT:
            newState = action.payload.comments
            return newState
        default:
            return state
    }
}

export default commentReducer;
