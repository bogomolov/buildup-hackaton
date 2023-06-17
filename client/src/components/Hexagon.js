import React, {useRef} from 'react'

const Hexagon = ({height, posX, posZ, color}) => {
    const meshRef = useRef();
    const ratio = 2;

    return (
        <mesh rotation={[-Math.PI, 0, 0]} ref={meshRef} position={[posX * ratio, height / 2, posZ * ratio]}>
            <cylinderGeometry args={[1, 1, height, 6]} />
            <meshBasicMaterial transparent opacity={height === 0 ? 0.9 : 0.9} color={color} />
        </mesh>
    )
}

export default Hexagon
