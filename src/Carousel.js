import React, { useEffect, useRef, useState } from "react";

import redmiImage from "./Assets/1739178997931_redmi.jpg";
import samsungImage from "./Assets/1739179288734_samsung.jpg";
import oppoImage from "./Assets/1739179306850_oppo.jpg";
import pocoImage from "./Assets/1739179816204_poco.jpg";
import realImage from "./Assets/1739179840686_realme.jpg";
import motorolaImage from "./Assets/1739179914829_motorola.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

function Carousel() {
  const imgURL = [
    redmiImage,
    samsungImage,
    oppoImage,
    pocoImage,
    realImage,
    motorolaImage,
  ];

  const intervalRef = useRef(null);
  const [image, setImage] = useState(0);
  const [paused, setPaused] = useState(false);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setImage((prevIndex) =>
        prevIndex >= imgURL.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const prevImage = () => {
    setImage((prevIndex) =>
      prevIndex === 0 ? imgURL.length - 1 : prevIndex - 1
    );
    setPaused(false);
    startInterval();
  };

  const nextImage = () => {
    setImage((prevIndex) =>
      prevIndex >= imgURL.length - 1 ? 0 : prevIndex + 1
    );
    setPaused(false);
    startInterval();
  };

  const togglePause = () => {
    if (paused) {
      console.log("Resuming...");
      startInterval();
    } else {
      console.log("Paused...");
      clearInterval(intervalRef.current);
    }
    setPaused(!paused);
  };

  return (
    <div className="carousel-holder">
      <div className="title-holder">
        <h2 className="carousel-title">IMAGE CAROUSEL</h2>
      </div>
      <div className="image-holder">
        <div className="arrow-icon" onClick={prevImage}>
          <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        </div>

        <div
          className="image-core"
          onClick={togglePause}
          style={{ position: "relative" }}
        >
          <img src={imgURL[image]} alt="mobile" />
          <div className="pause-overlay">
            {paused && (
              <FontAwesomeIcon
                icon={faPause}
                size="2xl"
                className="pause-icon"
              />
            )}
          </div>
        </div>

        <div className="arrow-icon" onClick={nextImage}>
          <FontAwesomeIcon icon={faArrowRight} size="2xl" />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
