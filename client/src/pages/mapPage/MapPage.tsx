import React, {useEffect} from 'react'
import { Canvas } from '@react-three/fiber';
import Panel from "src/components/Panel";
import Hexagon from "src/components/Hexagon";

import './MapPage.scss';
import {OrbitControls} from "@react-three/drei";
import {useDispatch} from "react-redux";
import {fetchMapDataAction} from "../../store/mapDrawData/mapDrawData.actions";
import {AppDispatch} from "../../store/types";
import {useMapData} from "../../store/mapDrawData/mapDrawData.selectors";

const MapPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const mapData = useMapData();

    useEffect(() => {
        dispatch(fetchMapDataAction(null))
    }, []);

    if (!mapData[0]) {
        return <></>
    }

    return (
        <div>
            <Canvas
                className={'map-page__canvas'}
                camera={{
                    fov: 90,
                    position: [0, 0, 9],
                }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[1, 1, 1]} intensity={0.5} />
                {mapData.map((item,firstIndex) => {
                    return item.map((item, insideIndex) => {
                        const even = insideIndex % 2;
                        return (
                            <Hexagon
                                posX={firstIndex + (even / 2)}
                                posZ={insideIndex}
                                height={item.citizens / 100}
                                color={firstIndex === 0 && insideIndex === 0 ? '#000' : item.color}
                            />
                        )
                    })
                })}
                <Panel x={mapData.length * 2} z={mapData[0].length * 2} />
                <OrbitControls enableDamping={true} />
            </Canvas>
        </div>
    );
};

export default MapPage;
