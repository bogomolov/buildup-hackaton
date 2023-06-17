import React, {useEffect} from 'react'
import { Canvas, useThree } from '@react-three/fiber';
import {
    CubeTextureLoader
} from 'three';
import {CameraControls, OrbitControls} from '@react-three/drei';
import {useDispatch} from 'react-redux';
import {fetchMapDataAction} from 'src/store/mapDrawData/mapDrawData.actions';
import {AppDispatch} from 'src/store/types';
import {useMapData, useMapFilter} from 'src/store/mapDrawData/mapDrawData.selectors';
import Panel from 'src/components/Panel';
import Hexagon from 'src/components/Hexagon';
import Header from 'src/components/header/Header';
import Button from '../../components/button/Button';

import './MapPage.scss';

const MapPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    let count = 0;

    const filter = useMapFilter();

    const mapData = useMapData();

    useEffect(() => {
        dispatch(fetchMapDataAction(null))
    }, []);

    function SkyBox() {
        const { scene } = useThree();
        const loader = new CubeTextureLoader();
        // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
        const texture = loader.load([
            '/logo517.png',
            '/logo517.png',
            '/logo517.png',
            '/logo517.png',
            '/logo517.png',
            '/logo517.png',
        ]);
        // Set the scene background property to the resulting texture.
        scene.background = texture;
        return null;
    }

    if (!mapData[0]) {
        return <></>
    }

    return (
        <div>
            <Header />
            <Canvas
                className={'map-page__canvas'}
                camera={{
                    fov: 90,
                    rotation: [0, 0, 0],
                    position: [60, 18, 150],
                }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[1, 1, 1]} intensity={0.5} />
                {mapData.map((item,firstIndex) => {
                    return item.map((item, lastIndex) => {
                        const even = lastIndex % 2;
                        return (
                            <Hexagon
                                posZ={firstIndex + (even / 2)}
                                posX={lastIndex}
                                height={item.citizens / 100}
                                color={item.colors[filter]}
                            />
                        )
                    })
                })}
                <Panel x={mapData.length * 2} z={mapData[0].length * 2} />
                <OrbitControls enableDamping={true} />
                <SkyBox />
                <CameraControls />
            </Canvas>
            <Button handleClick={() => console.log(count)} title={'kjsdfnvk'} />
        </div>
    );
};

export default MapPage;
