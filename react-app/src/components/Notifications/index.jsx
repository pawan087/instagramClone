// import { useSelector } from 'react-redux'

const Notifications = ({events}) => {



    return (
        <div>
            {events.map((event) => (
                <div key={event.id}>
                    <p>{event.event_receiver_id}</p>
                    <p>{event.event_creator_id}</p>
                </div>
            ))}
        </div>
    )
}
export default Notifications