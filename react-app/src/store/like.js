const SET_LIKE = "likes/SET_LIKES"

const load = (likes) => ({
    type: SET_LIKE,
    payload: likes
})

export const addLike = (like) => async (dispatch) => {
    const response = await fetch("/api/images/likes/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(like)
        }
    )
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "ADD LIKE THUNK FAILED!"
}

export const deleteOneLike = (id, eventId) => async (dispatch) => {
    console.log('--------------------------------------------------------')
    console.log('INSIDE THUNK BEFORE FETCH')
    console.log('THUNK ID ARGUMENT: ' + id)
    const response = await fetch("/api/images/likes/",
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ like_id: id, event_id: eventId})
        }
    )

    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else console.log("DELETE LIKE THUNK ERROR: BAD REQUEST")
}

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
