// HOMEPAGE FEATURED SECTION

import useFetech from "../../hooks/useFetch";
import "./featureBlock.css";

const FeatureBlock = () => {

  const {data,loadingStatus, error, reFetch} = useFetech("/hotel/?featured=true&limit=2");

  return (
    <div className="fp">
      { loadingStatus ? ("Loading Items of types") : (
        <>
          {data.map((item)=>{
            return (
              <div className="fpItem" key={item._id}>
                <img
                  src={item.hotelphotos[0]}
                  alt=""
                  className="fpImg"
                />
                <span className="fpName">{item.hotelname}</span>
                <span className="fpCity">{item.hotelcity}</span>
                <span className="fpPrice">Starting from ${item.cheapestprice}</span>
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              </div>
            )})
          }
        </>)
      }
      
      
    </div>
  );
};

export default FeatureBlock;
