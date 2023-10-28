import * as mobilenet from "@tensorflow-models/mobilenet";
import { useEffect, useState, useRef } from "react";

function App() {
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [model, setmodel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([]);

  const imageRef = useRef();

  const loadModel = async () => {
    setIsModalLoading(true);
    try {
      const model = await mobilenet.load();
      setmodel(model);
      setIsModalLoading(false);
    } catch (error) {
      console.log(error);
      setIsModalLoading(false);
    }
  };

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
    // console.log(e);
  };

  const identify = async () => {
    const results = await model?.classify(imageRef.current);
    setResults(results);
    // console.log(results);
  };
  // const identify = async () => {
  //   if (model) {
  //     try {
  //       const results = await model.classify(imageRef.current);
  //       console.log(results);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  useEffect(() => {
    loadModel();
  }, []);

  if (isModalLoading) {
    return <h2>Model Loading...</h2>;
  }

  console.log(results);
  return (
    <div className="App">
      <h1 className="header">Image detection</h1>
      <div className="inputHolder">
        <input
          type="file"
          accept="image/*"
          capture="camera"
          className="uploadInput"
          onChange={uploadImage}
        />
      </div>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
            {imageURL && (
              <img
                src={imageURL}
                alt="upload preview"
                crossOrigin="anonymous"
                ref={imageRef}
              />
            )}
          </div>
        </div>
        {imageURL && (
          <button className="button" onClick={identify}>
            {" "}
            Identify image
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
