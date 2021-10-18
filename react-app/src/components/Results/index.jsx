import { useParams } from "react-router";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setAllImages } from "../../store/image";
import ImageComponent from "../Images/ImageComponent";
import "./Results.css";
import Footer from "../Footer";
import Loader from "react-loader-spinner";

const Results = () => {
  const [load, setLoad] = useState(false)
  const params = useParams();
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);

  const tagImages = images.filter((image) =>
    image?.hashtags?.includes(params.tag)
  );

  useEffect(() => {
    (async () => {
      await dispatch(setAllImages())
      setLoad(true)
    })();
  }, [dispatch])

  if (!load) {
    return (
      <div className="loaderIconContainer">
        <Loader
          type="Puff"
          color="#e13765"
          height={100}
          width={100}
        />
      </div>
    );
  }

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
      <Footer />
    </>
  );
};

export default Results;
