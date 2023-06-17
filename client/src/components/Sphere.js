import React, {useRef} from 'react'
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {useLoader, useFrame} from "@react-three/fiber";

import texture from 'src/assets/textureMap.jpeg';

function Sphere() {
    const meshRef = useRef();
    const textureMap = useLoader(TextureLoader, texture);
    useFrame(() => {
        meshRef.current.rotation.y += 0.003;
    });
    return (
        <mesh ref={meshRef} position={[0, 0, -2]}>
            <sphereGeometry args={[2, 32]} />
            <meshStandardMaterial map={textureMap} />
        </mesh>
    )
}

export default Sphere
