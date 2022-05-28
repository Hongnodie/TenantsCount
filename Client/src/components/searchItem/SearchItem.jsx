import "./searchItem.css";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img
        src={item.hotelphotos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.hotelname}</h1>
        <span className="siDistance">{item.hoteldistance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.hotelrating && 
        <div className="siRating">
          <span>Excellent</span>
          <button>{item.hotelrating}</button>
        </div> }
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestprice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <a href={`hotel/${item._id}`} >
            <button className="siCheckButton">See availability</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
