const SET_IMAGE = "images/SET_IMAGE"

const setImages = (images) => ({
    type: SET_IMAGE,
    payload: images
})

export const setAllImages = () => async(dispatch) => {
    const response = await fetch("/api/images/")
    if(response.ok) {
        const data = await response.json()
        dispatch(setImages(data))
    } else return "THUNK ERROR: BAD REQUEST"
}

export const addOneImage = (image) => async(dispatch) => {
    console.log(JSON.stringify(image))
    await fetch("/api/images/", 
        { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(image)
        }
    )
    // if(response.ok) {
    //     const data = await response.json()
    //     dispatch(setImages(data))
    // } else return "THUNK ERROR: BAD REQUEST"
}

const initialState = []
const imageReducer = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case SET_IMAGE:
            newState = action.payload.images
            return newState
        default:
            return state
    }
}

export default imageReducer