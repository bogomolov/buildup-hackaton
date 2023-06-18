import React, {useEffect, useState} from 'react'
import { Canvas, useThree } from '@react-three/fiber';
import {
    CubeTextureLoader
} from 'three';
import {CameraControls, OrbitControls} from '@react-three/drei';
import {useDispatch} from 'react-redux';

import {AppDispatch} from 'src/store/types';

import {fetchMapDataAction} from 'src/store/mapDrawData/mapDrawData.actions';
import {useMapData, useMapFilter} from 'src/store/mapDrawData/mapDrawData.selectors';

import Panel from 'src/components/Panel';
import Hexagon from 'src/components/Hexagon';
import Header from 'src/components/header/Header';

import './MapPage.scss';
import ModalWindow from 'src/components/modalWindow/ModalWindow';

const MapPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItemPos, setSelectedItemPos] = useState<{ x: number, z: number }>({x: 0, z: 0});

    const filter = useMapFilter();
    const mapData = useMapData();

    useEffect(() => {
        dispatch(fetchMapDataAction(null));
    }, []);

    const openModal = (x: number, z: number) => {
        setSelectedItemPos({x, z})
        setShowModal(true);
    }

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
                {mapData[0]
                    ? mapData.map((item,firstIndex) => {
                    return item.map((item, lastIndex) => {
                        return (
                            <Hexagon
                                posZ={firstIndex}
                                posX={lastIndex}
                                height={item.citizens / 100}
                                color={item[filter]}
                                click={openModal}
                            />
                        )
                    })
                })
                : null}
                {
                    mapData.length && mapData[0].length
                        ? (<Panel x={mapData.length * 2} z={mapData[0].length * 2} />)
                        : null
                }

                <OrbitControls enableDamping={true} />
                <SkyBox />
                <CameraControls />
            </Canvas>
            <ModalWindow selectedItemPos={selectedItemPos} show={showModal} setShow={setShowModal}/>
        </div>
    );
};

export default MapPage;
