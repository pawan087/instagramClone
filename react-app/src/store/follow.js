const SET_FOLLOW = "follows/SET_FOLLOWS"

const load = (user) => ({
    type: SET_FOLLOW,
    payload: user
})

export const addFollow = (follow) => async (dispatch) => {
    console.log(follow)
    const response = await fetch("/api/users/following/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(follow)
        }
    )
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "ADD FOLLOW THUNK FAILED!"
}

export const deleteFollow = (follow) => async (dispatch) => {
    const response = await fetch("/api/users/following/",
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(follow)
        }
    )
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "DELETE FOLLOW THUNK FAILED!"
}

// export const deleteOneLike = (id) => async (dispatch) => {
//     console.log('--------------------------------------------------------')
//     console.log('INSIDE THUNK BEFORE FETCH')
//     console.log('THUNK ID ARGUMENT: ' + id)
//     const response = await fetch("/api/images/likes/",
//         {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ id: id })
//         }
//     )

//     if (response.ok) {
//         const data = await response.json()
//         dispatch(load(data))
//     } else console.log("DELETE LIKE THUNK ERROR: BAD REQUEST")
// }

export const setFollows = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/following/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "READ THUNK ERROR: BAD REQUEST"
}

const initialState = []
const followReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_FOLLOW:
            newState = action.payload.user
            return newState
        default:
            return state
    }
}

export default followReducer
