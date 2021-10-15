import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addOneImage } from "../../../store/image";
import { setAllImages } from "../../../store/image";
import "./test.css";

const TestAddImageForm = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  // const [imageUrl, setImageUrl] = useState("")
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [hashtags, setHashtags] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const reset = () => {
    setTitle("");
    setCaption("");
    // setImageUrl("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("img_url", image);
    formData.append("user_id", user.id);
    formData.append("hashtags", hashtags);

    setImageLoading(true);
    await dispatch(addOneImage(formData));
    setImageLoading(false);
    dispatch(setAllImages());

    history.push("/");

    reset();
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);

    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

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
          {!preview && (
            <div className="input-file-container">
              <input
                type="file"
                accept="image/*"
                onChange={updateImage}
                className="inpuut-file"
                id="my-file"
              />

              <label tabindex="0" for="my-file" class="input-file-trigger blueButton button">
                Select a file...
              </label>
            </div>
          )}

          {preview && <img class="picToUpload pic2" src={preview} alt="picToUpload" />}
        </div>

        <div className="rightContainer">
          <div className="rightOne">
            <img src={user?.avatar} className="avatar" alt="userProfile"></img>
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
          </div>

          <div className="emptyDiv divisor" />

          <div className="rightBtnContainer">
            {image && (
              <button onClick={handleSubmit} className="btn1 blueButton button">
                Share
              </button>
            )}
            {!image && <button className="btn2 blueButton button">Share</button>}
          </div>
        </div>
      </div>

      {imageLoading && (
        <div className="loadingModal">
          <div className="logo innerModal">
            Uploading <span class="dot-elastic2"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestAddImageForm;
