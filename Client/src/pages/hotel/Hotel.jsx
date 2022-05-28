// ITEM DETAIL PAGE

import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import useFetech from "../../hooks/useFetch";

import {dispatchContext} from "../../context/dispatchContext";

const Hotel = () => {
  const location = useLocation();
  // console.log(location.pathname);
  let locationId = location.pathname.split("/")[2];
  // console.log(locationId);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const {data,loadingStatus, error} = useFetech(`http://localhost:5000/hotel/${locationId}`);

  // const {dates, options, dispatcher} = useContext(dispatchContext);

  function dayDiff(date1, date2) {
    const unitimeDiff = Math.abs(date2.getTime() - date1.getTime());
    const unitimePerDay = 1000 * 60 * 60 * 24;
    const difDays = Math.ceil(unitimeDiff/unitimePerDay);
    return difDays;
  }
  // dispatcher({payload:{dates, options}});
  // console.log(dates);
  // console.log(dayDiff(dates[0].startDate, dates[0].endDate))

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      { loadingStatus? ("Detail Page loading") : (<>
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.hotelphotos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.hotelname}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.hoteladdress}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.hoteldistance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestprice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {/* {data.hotelphotos.map((photoUrl, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photoUrl}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))} */}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.hotelname}</h1>
              <p className="hotelDesc">
              {data.hoteldesc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              {/* <h1>Perfect for a {durationDays}-night stay!</h1> */}
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                {/* <b>${durationDays * data.cheapestprice * options.room}</b> ({durationDays} nights) */}
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      </>)}
    </div>
  );
};

export default Hotel;
