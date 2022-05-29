import CityBlock from "../../components/CityBlock/CityBlock";
import FeatureBlock from "../../components/FeatureBlock/FeatureBlock";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import MailList from "../../components/mailList/MailList";
import Header from "../../components/Header/Header";
import TypeBlock from "../../components/TypeBlock/TypeBlock";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <SearchBar/>
      <div className="homeContainer">
        <h1 className="homeTitle">Listing by Cities</h1>
        <CityBlock/>
        <h1 className="homeTitle">Browse by property type</h1>
        <TypeBlock/>
        <h1 className="homeTitle">Featured Living Space</h1>
        <FeatureBlock/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
