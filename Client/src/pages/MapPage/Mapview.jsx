import React, { useRef, useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
// import useFetch from "../../hooks/useFetch";
import axios from "axios";

import Map, {Marker, Popup} from 'react-map-gl';

import "./mapview.css";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


axios.defaults.baseURL = "/";
// TODO: HIDE
// mapboxgl.accessToken = "pk.eyJ1IjoiZ3JhbnRnYW4iLCJhIjoiY2wzaWd1bzJuMDJhbjNwcGQzbHZ2aW9ocSJ9.U-DLPr6SzIG6LYQ-Q5qhRw";
 
export default function Mapview() {
    // const mapContainer = useRef(null);
    // const map = useRef(null);
    // INIT POSITION
    // const [lng, setLng] = useState(138.599503);
    // const [lat, setLat] = useState(-34.921230);
    // const [zoom, setZoom] = useState(12);

    // AUTH
    const [currentUser, setCurrentUser] = useState(window.localStorage.getItem('user'));

    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);

    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 138.599503,
        longitude: -34.921230,
        zoom: 12,
        bearing: 0,
        pitch: 0
    });

    const getPins = async () => {
        try {
            const allPins = await axios.get("/mapview/allpin");
            // console.log(allPins);
            setPins(allPins.data);
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
        // getPins();
    // }, [])

    // HANDLE DBCLICK ACTION - CREATE IF LOGIN
    const handleAddClick = (e) => {
        // console.log(viewport.viewState)
        // const [long, lat] = viewport.viewState;
        let long = viewport.viewState.longitude;
        let lat = viewport.viewState.latitude;
        console.log(long);
        setNewPlace({
            lat,
            long,
        });
    }

    const handleMarkerClick = (id, lat, long) => {
        // setCurrentPlaceId(id);
        setViewport({ ...viewport, latitude: lat, longitude: long })
    }

    // NEWPIN - on Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
            username: currentUser,
            title,
            desc,
            lat: newPlace.lat,
            long: newPlace.long,
        }
        try {
            const res = await axios.post('/mapview', newPin);
            setPins([...pins, res.data]);
            setNewPlace(null);
        } catch (error) {
            console.log(error);
        }
    }

    // const {data,loadingStatus, error, reFetch} = useFetch("/allpin");

    // useEffect(() => {
    //     if (map.current) return; // initialize map only once
    //     map.current = new mapboxgl.Map({
    //         container: mapContainer.current,
    //         // TODO: HIDE
    //         style: 'mapbox://styles/grantgan/cl3igxdwk000a16pfq05ibitz',
    //         center: [lng, lat],
    //         zoom: zoom
    //     });
    // });
 
    // useEffect(() => {
    //     if (!map.current) return; // wait for map to initialize
    //     map.current.on('move', () => {
    //         setLng(map.current.getCenter().lng.toFixed(4));
    //         setLat(map.current.getCenter().lat.toFixed(4));
    //         setZoom(map.current.getZoom().toFixed(2));
    //     });
    // });
 
    return (
        <div>
            <Header />
            <SearchBar />
            {/* <div className="map-section">
                <div className="sidebar"> Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} </div>
                <div ref={mapContainer} className="map-container" />
            </div> */}

            <Map
            // {...viewport}
                initialViewState={{
                longitude: 138.599503,
                latitude: -34.921230,
                zoom: 12
                }}
                style={{width: '100vw', height: '100vh'}}
                mapStyle="mapbox://styles/grantgan/cl3igxdwk000a16pfq05ibitz"
                mapboxAccessToken="pk.eyJ1IjoiZ3JhbnRnYW4iLCJhIjoiY2wzaWd1bzJuMDJhbjNwcGQzbHZ2aW9ocSJ9.U-DLPr6SzIG6LYQ-Q5qhRw"
                onMoveEnd={setViewport}
                onDblClick={currentUser && handleAddClick}
            />
            {/* {pins.map((singlePin)=> (                
                return (
                    <div key={singlePin._id}>
                
                    <Marker latitude={singlePin.lat}
                    longitude={singlePin.long} anchor="bottom" >
                    <img src="./pin.png" />
                    </Marker>)
            } */}
            {/* SHOW ALL PINS */}
            {pins.map((singlePin)=> {
                return (
                <div key={singlePin._id}>
                    {<Marker longitude={singlePin.lat} latitude={singlePin.long} anchor="bottom" >
                    <FontAwesomeIcon icon={faBed} onClick={handleMarkerClick(singlePin._id, singlePin.lat, singlePin.long)}/>
                    </Marker>}
                
                    {singlePin._id === currentPlaceId &&
                        (
                            <Popup
                                latitude={singlePin.lat}
                                longitude={singlePin.long}
                                closeButton={true}
                                closeOnClick={false}
                                anchor="left"
                                onClose={() => setCurrentPlaceId(null)}>

                                <div className="card">
                                    <label>Place</label>
                                    <h4 className="place">{singlePin.title}</h4>
                                    <label>Review</label>
                                    <p className="desc">{singlePin.desc}</p>
                                    <label>Information</label>
                                    <span className="username">
                                        Created by <b>{singlePin.username}</b>
                                    </span>
                                    <span className="date">{new Date(singlePin.createdAt).toDateString()}</span>
                                </div>
                            </Popup>
                        )
                    }
                </div>
            )})}
            {/* CREATE PIN */}
            {newPlace &&
                (
                    <Popup
                        latitude={newPlace.lat}
                        longitude={newPlace.long}
                        closeButton={true}
                        closeOnClick={false}
                        anchor="left"
                        onClose={() => setNewPlace(null)}>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label>Title</label>
                                <input
                                    placeholder='Enter a Title...'
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <label>Review</label>
                                <textarea
                                    rows="4"
                                    placeholder='Say something about the place...'
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                                <button className='submitButton' type='submit'>Add Pin</button>
                            </form>
                        </div>
                    </Popup>
                )
            }
        </div>
    );
}