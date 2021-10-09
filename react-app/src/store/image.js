const SET_IMAGE = "images/SET_IMAGE"

const setImages = (images) => ({
    type: SET_IMAGE,
    payload: images
})

export const setAllImages = () => async(dispatch) => {
    console.log("fetching images from database...")
    const response = await fetch("/api/images")
    if(response.ok) {
        console.log("response successful")
        const data = await response.json()
        console.log(data)
        console.log("dispatching to reducer...")
        dispatch(setImages(data))
    } else return "THUNK ERROR: BAD REQUEST"
}

const initialState = {images: null}
const imageReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_IMAGE:
            return action.payload
        default:
            return state
    }
}

export default imageReducer