import * as React from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import html2canvas from 'html2canvas';
// import 'leaflet-print';
// import 'leaflet-print/dist/leaflet.print.css';

import {useEffect, useState} from "react";
import './Map.scss';
// import axios from "axios";

export function Map() {
    const [mapImage, setMapImage] = useState('');
    const [call, setCall] = useState(false);
    const captureMap = () => {
        const mapElement = document.querySelector('.leaflet-container');
        if (mapElement === null) {
            return
        }
        setCall(!call);
        // @ts-ignore
        html2canvas(mapElement).then((canvas) => {
            const image = canvas.toDataURL();
            console.log(image);
            setMapImage(image);
        });
    };
    function AreaSelect (call) {
        const map = useMap();

        useEffect(() => {
            const printer = map.getPane();
            console.log(printer);
        }, [call]);

        return null;
    }

    return (
        <>
            <MapContainer center={[44.71, 37.71]} zoom={13} >
                <AreaSelect call />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            <button onClick={captureMap}>
                oisdjnvubdsfuyshnjc
            </button>
            {mapImage && <img src={mapImage} alt="Карта" />}
        </>
    );
}
