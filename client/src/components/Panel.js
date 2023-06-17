import React, {useRef} from 'react'
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {useLoader} from "@react-three/fiber";

import texture from 'src/assets/mapScreen.png';

const Panel = ({x = 60, z = 60}) => {
    const meshRef = useRef();
    const textureMap = useLoader(TextureLoader, texture);

    return (
        <mesh rotation={[-Math.PI / 2, 0, Math.PI]} ref={meshRef} position={[18, -3, 28]}>
            <planeGeometry args={[x, z]} />
            <meshStandardMaterial map={textureMap} />
        </mesh>
    )
}

export default Panel
