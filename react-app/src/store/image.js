const SET_IMAGE = "images/SET_IMAGE"

const load = (images) => ({
    type: SET_IMAGE,
    payload: images
})

/*--------------------------------------------------------
---------------------COMMENT THUNKS-----------------------
-------------------------------------------------------- */

export const addComment = (comment) => async (dispatch) => {
    const response = await fetch("/api/images/comments/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        }
    )
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "ADD COMMENT THUNK FAILED!"
}

export const editOneComment = (editedComment) => async (dispatch) => {
    const response = await fetch("/api/images/comments/",
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedComment)
        }
    )
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "EDIT COMMENT THUNK FAILED!"
}

export const deleteOneComment = (id) => async (dispatch) => {
    const response = await fetch("/api/images/comments/",
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        }
    )

    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else console.log("DELETE THUNK ERROR: BAD REQUEST")
}


/*--------------------------------------------------------
---------------------IMAGE THUNKS-----------------------
-------------------------------------------------------- */

export const addOneImage = (image) => async (dispatch) => {
    await fetch("/api/images/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(image)
            body: image
        }
    )
}

export const setAllImages = () => async (dispatch) => {
    const response = await fetch("/api/images/")
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "READ THUNK ERROR: BAD REQUEST"
}

export const editOneImage = (editedImage) => async (dispatch) => {
    const response = await fetch("/api/images/",
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedImage)
        }
    )
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "EDIT THUNK ERROR: BAD REQUEST"
}

export const deleteOneImage = (id) => async (dispatch) => {
    const response = await fetch("/api/images/",
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        }
    )
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "DELETE THUNK ERROR: BAD REQUEST"
}


const initialState = []
const imageReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_IMAGE:
            newState = action.payload.images
            return newState
        default:
            return state
    }
}

export default imageReducer
