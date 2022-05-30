import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import SearchBar from "../../components/SearchBar/SearchBar";
import useFetch from "../../hooks/useFetch";

import "./mapview.css";

// TODO: HIDE
mapboxgl.accessToken = "pk.eyJ1IjoiZ3JhbnRnYW4iLCJhIjoiY2wzaWd1bzJuMDJhbjNwcGQzbHZ2aW9ocSJ9.U-DLPr6SzIG6LYQ-Q5qhRw";
 
export default function Mapview() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    // INIT POSITION
    const [lng, setLng] = useState(138.599503);
    const [lat, setLat] = useState(-34.921230);
    const [zoom, setZoom] = useState(12);

    const [pins, setPins] = useState([]);

    const {data,loadingStatus, error, reFetch} = useFetch("/allpin");

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            // TODO: HIDE
            style: 'mapbox://styles/grantgan/cl3igxdwk000a16pfq05ibitz',
            center: [lng, lat],
            zoom: zoom
        });
    });
 
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });
 
    return (
        <div>
            <SearchBar />
            <div className="map-section">
                <div className="sidebar"> Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} </div>
                <div ref={mapContainer} className="map-container" />
            </div>
        </div>
    );
}