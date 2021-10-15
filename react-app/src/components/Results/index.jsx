import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllImages } from "../../store/image";
import ImageComponent from "../Images/ImageComponent";
import "./Results.css";

const Results = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);

  const tagImages = images.filter((image) =>
    image?.hashtags?.includes(params.tag)
  );

  useEffect(() => {
    dispatch(setAllImages());
  }, [dispatch]);

  return (
    <>
      {tagImages?.length ? (
        <div className="imageContainer">
          {tagImages?.map((image) => (
            <ImageComponent image={image} />
          )).reverse()}
        </div>
      ) : (
        <div className="noResultsContainer">
          <div className="noResultsMessage">No results found.</div>
        </div>
      )}
    </>
  );
};

export default Results;
