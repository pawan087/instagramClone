import { useSelector } from 'react-redux'

const Notifications = () => {

    const user = useSelector((state) => state.session.user)

    console.log(user.incoming_events.incoming)

    return (
        <div>
            {/* <h3>This is an event</h3> */}
        </div>
    )
}
export default Notifications