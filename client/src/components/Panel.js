import React, {useRef} from 'react'
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {useLoader} from "@react-three/fiber";

import texture from 'src/assets/mapScreen.png';

const Panel = ({x = 60, z = 60}) => {
    const meshRef = useRef();
    const textureMap = useLoader(TextureLoader, texture);

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} ref={meshRef} position={[50, -1, 70]}>
            <planeGeometry args={[x, z]} />
            <meshStandardMaterial map={textureMap} />
        </mesh>
    )
}

export default Panel
