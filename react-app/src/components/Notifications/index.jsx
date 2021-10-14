// import { useSelector } from 'react-redux'

const Notifications = ({events}) => {

    // const user = useSelector((state) => state.session.user)
    // console.log(user.incoming_events.incoming)


    return (
        <div>
            {events.map((event) => (
                <div>
                    <p>{event.event_receiver_id}</p>
                    <p>{event.event_creator_id}</p>
                </div>
            ))}
        </div>
    )
}
export default Notifications