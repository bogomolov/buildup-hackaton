import React, {useRef} from 'react'
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {useLoader} from "@react-three/fiber";

import texture from 'src/assets/textureMap.jpeg';

const Panel = () => {
    const meshRef = useRef();
    const textureMap = useLoader(TextureLoader, texture);

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}  ref={meshRef} position={[0, -3, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial map={textureMap} />
        </mesh>
    )
}

export default Panel
