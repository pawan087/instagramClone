const SET_EVENT = "events/SET_EVENT"

const load = (events) => ({
    type: SET_EVENT,
    payload: events
})

export const addEvent = (event, user_id) => async (dispatch) => {
    const response = await fetch(`/api/images/events/${user_id}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event)
        }
    )
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "ADD LIKE THUNK FAILED!"
}

export const deleteOneEvent = (user_id, image_id) => async (dispatch) => {
    const response = await fetch(`/api/images/events/${user_id}/${image_id}`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }
    )

    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else console.log("DELETE LIKE THUNK ERROR: BAD REQUEST")
}

export const setAllEvents = () => async (dispatch) => {
    const response = await fetch("/api/images/events")
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "READ THUNK ERROR: BAD REQUEST"
}

export const setAllMyEvents = (user_id) => async (dispatch) => {
    console.log(user_id)
    const response = await fetch(`/api/images/events/${user_id}/`)
    if (response.ok) {
        const data = await response.json()
        dispatch(load(data))
    } else return "READ THUNK ERROR: BAD REQUEST"
}

const initialState = []
const eventReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_EVENT:
            newState = action.payload.events
            return newState
        default:
            return state
    }
}

export default eventReducer
