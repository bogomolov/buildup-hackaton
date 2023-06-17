import React from 'react'
import { Canvas } from '@react-three/fiber';
import Panel from "src/components/Panel";
import Hexagon from "src/components/Hexagon";

import './MapPage.scss';
import {OrbitControls} from "@react-three/drei";

const MapPage = () => {
    return (
        <div>
            <Canvas
                className={'map-page__canvas'}
                camera={{
                    fov: 90,
                    position: [0, 0, 9],
                }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[1, 1, 1]} intensity={0.8} />
                <Hexagon posX={0} posZ={0} height={2} color={'#ffff00'}/>
                <Hexagon posX={1} posZ={0} height={2} color={'#ffff00'}/>
                <Hexagon posX={2} posZ={0} height={2} color={'#ffff00'}/>
                <Hexagon posX={3} posZ={0} height={2} color={'#ffff00'}/>
                <Hexagon posX={4} posZ={0} height={2} color={'#ffff00'}/>
                <Hexagon posX={5} posZ={0} height={2} color={'#ffff00'}/>
                <Hexagon posX={6} posZ={0} height={2} color={'#ffff00'}/>
                <Hexagon posX={7} posZ={0} height={2} color={'#ffff00'}/>
                <Hexagon posX={8} posZ={0} height={2} color={'#ffff00'}/>
                <Hexagon posX={9} posZ={0} height={2} color={'#ffff00'}/>
                <Hexagon posX={0.5} posZ={0.9} height={2} color={'#ffff00'}/>
                <Hexagon posX={1.5} posZ={0.9} height={2} color={'#ffff00'}/>
                <Hexagon posX={2.5} posZ={0.9} height={2} color={'#ffff00'}/>
                <Hexagon posX={3.5} posZ={0.9} height={2} color={'#ffff00'}/>
                <Hexagon posX={4.5} posZ={0.9} height={2} color={'#ffff00'}/>
                <Hexagon posX={5.5} posZ={0.9} height={2} color={'#ffff00'}/>
                <Hexagon posX={6.5} posZ={0.9} height={2} color={'#ffff00'}/>
                <Hexagon posX={7.5} posZ={0.9} height={2} color={'#ffff00'}/>
                <Hexagon posX={8.5} posZ={0.9} height={2} color={'#ffff00'}/>
                <Hexagon posX={9.5} posZ={0.9} height={2} color={'#ffff00'}/>
                <Panel />
                <OrbitControls enableDamping={true} />
            </Canvas>
        </div>
    );
};

export default MapPage;
