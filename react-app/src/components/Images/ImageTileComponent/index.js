import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteOneImage } from "../../../store/image"
import { setAllLikes } from "../../../store/like"
import { useHistory } from "react-router-dom"
import liked from '../../../image_assets/liked.svg'
import comment from '../../../image_assets/comment.svg'
import '../images.css'
import ImageModal from "../ImageModal"
import personDots from '../../../image_assets/personDots.svg'

const ImageTileComponent = ({ image }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.session.user)
  const likes = useSelector((state) => state.likes)
  const [isImageOpen, setIsImageOpen] = useState(false)
  let thisPicturesLikes = likes.filter(like => like?.image?.id === image?.id);
  let thisPicturesComments = image?.comments?.comments;

  const handleDelete = () => {
    dispatch(deleteOneImage(image.id))
    history.push("/")
  }

  useEffect(() => {
    dispatch(setAllLikes())
  }, [dispatch])

  return (
    <div className="imageTile" key={image?.id}>
      <div className="individualImage">
        <div className="imageWrapper">
          <img src={image?.img_url} alt="anImage" className="imageObj" />
        </div>
        <div className="imageCover">
          <div className="imageStatus" onClick={() => history.push(`/images/${image?.id}`)}>
            <div className="imageLikesContainer">
              <img src={liked} alt="liked" className="likes tileIcon" draggable="false" />
              <div className="imageStatusText">{thisPicturesLikes?.length}</div>
            </div>
            <div className="imageCommentsContainer">
              <img src={comment} alt="comments" className="comments tileIcon" draggable="false" />
              <div className="imageStatusText">{thisPicturesComments?.length}</div>
            </div>
          </div>
          {/* IMAGE CONTROLS */}
          {user?.id === image?.user_id ?
            <div className="imageControls">
              <button className='modal' onClick={() => setIsImageOpen(true)} style={{ opacity: '1' }}><img src={personDots} alt='options' className="menuDots" /></button>
              <ImageModal open={isImageOpen} onClose={() => setIsImageOpen(false)}>
                <button className='red' onClick={handleDelete}>Delete</button>
                <button className='red' onClick={(e) => history.push(`/images/${image?.id}/edit`)}>Edit</button>
              </ImageModal>
            </div>
            : false}
        </div>
      </div>
    </div>
  )
}
export default ImageTileComponent
