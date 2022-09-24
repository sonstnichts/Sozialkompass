import{Swiper, SwiperSlide} from "swiper/react"
import React from "react";
import Question from "./Questions-new copy";

class Mainbody extends React.Component {
  render() {
    return (
      <div className = "main-content">
        <div className = "cards">
          <Question />
        </div>
      </div>
    );
  }
}

export default Mainbody;
