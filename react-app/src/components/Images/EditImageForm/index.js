import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setAllImages } from "../../../store/image";
import { editOneImage } from "../../../store/image";
import "./EditImage.css";
import Footer from "../../Footer";

const EditImageForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const user = useSelector((state) => state.session.user);
  const images = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(setAllImages());
  }, [dispatch]);

  const currentImage = images.filter((image) => image.id === +params.id);

  //   console.log(currentImage[0]?.img_url, '--------------------')

  const [title, setTitle] = useState(currentImage[0]?.title);
  const [caption, setCaption] = useState(currentImage[0]?.caption);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(currentImage[0]?.img_url);
  const [selectedFile, setSelectedFile] = useState();
  const [hashtags, setHashtags] = useState(
    currentImage[0]?.hashtags?.join(" ")
  );

  const reset = () => {
    setTitle("");
    setCaption("");
    setImageUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedImage = {
      image_id: params.id,
      title,
      caption,
      user_id: user.id,
      img_url: imageUrl,
      hashtags,
    };

    dispatch(editOneImage(editedImage));
    history.push(`/images/${params.id}`);
    reset();
  };

  const updateImage = (e) => {
    const file = e.target.files[0];

    setSelectedFile(e.target.files[0]);

    setImage(file);
  };

  const goBack = (e) => {
    e.preventDefault();

    history.push("/");
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label>Image Title</label>
          <input
            type="text"
            placeholder="Image Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Caption</label>
          <input
            type="text"
            placeholder="Image Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <div>
          <label>Hashtags</label>
          <input
            type="text"
            placeholder="Hashtags"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          <p>Seperate tags by spaces</p>
        </div>

        <button>Submit</button>
      </form> */}
      <div className="outerContainer1">
        <div className="topContainer">
          <div onClick={goBack} className="backBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
          <p className="header">Compose</p>
        </div>

        <div className="bottomContainer">
          <div className="leftContainer">
            <img
              class="picToUpload pic2"
              src={currentImage[0]?.img_url}
              alt="currentImage"
            />
          </div>

          <div className="rightContainer">
            <div className="rightOne">
              <img
                src={user?.avatar}
                className="avatar"
                alt="userProfile"
              ></img>
              <p className="username">{user?.username}</p>
            </div>

            <div className="rightTwo">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="caption2"
                placeholder="Write a caption..."
              />
            </div>

            {/*<div className="rightThree">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Title..."
              type="text"
              className="title"
            />
          </div>*/}

            <div className="rightFour">
              <input
                placeholder="Add Hashtags..."
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="hashtags"
              />
              <p>seperate tag names by spaces</p>
            </div>

            <div className="emptyDiv divisor" />

            <div className="rightBtnContainer">
              <button onClick={handleSubmit} className="btn blueButton button">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditImageForm;
