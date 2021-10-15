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

  console.log(image);

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <div className="input-file-container">
          <input
            type="file"
            accept="image/*"
            onChange={updateImage}
            className="inpuut-file"
            id="my-file"
          />

          <label tabindex="0" for="my-file" class="input-file-trigger">
            Select a file...
          </label>

          {imageLoading && <p>Loading...</p>}
        </div>

        <div>
          <label>Hashtags</label>

          <input
            type="text"
            placeholder="Hashtags"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          <p>Separate tags by spaces</p>
        </div>

        <button>Submit</button>
      </form>
      <div className="picContainer">
        <img className="pic" src={preview}></img>
      </div>

      <div className="outerContainer">
        <div className="topContainer">
          <span className="backBtn">{"<--"}</span>
          <span className="title">Compose</span>
        </div>

        <div className="bottomContainer">
          <div className="leftContainer">
            <img class="picToUpload" src="" />
          </div>

          <div className="rightContainer">
            <div className='rightOne'>
              <img src="" className="avatar"></img>
              <span classNam="username">pwnpreet</span>
            </div>

            <div className='rightTwo'>
              <textarea className="caption" placeholder="Write a caption..." />
            </div>

            <div className='rightThree'>
              <input placeholder="Add Title..." type="text" className="title" />
            </div>

            <div className='rightFour'>
              <input
                placeholder='Add Hashtags..."'
                type="text"
                className="hashtags"
              />
            </div>

            <div className="emptyDiv divisor" />

            <div className="btnContainer">
              <button className="btn">Share</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestAddImageForm;
