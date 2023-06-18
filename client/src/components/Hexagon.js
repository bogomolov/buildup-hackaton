import React, {useRef} from 'react'

const Hexagon = ({height, posX, posZ, color, click}) => {
    const meshRef = useRef();
    const ratio = 2;

    const even = posX % 2;

    return (
        <mesh onClick={(e) => {
            e.stopPropagation();
            click(posX, posZ);
        }} rotation={[-Math.PI, Math.PI / 2, 0]} ref={meshRef} position={[posX / (79/111), height / 2, ((posZ + (even / 2)) * ratio) / (79/111)]}>
            <cylinderGeometry args={[1, 1, height, 6]} />
            <meshBasicMaterial transparent opacity={height === 0 ? 0.3 : 0.9} color={color} />
        </mesh>
    )
}

export default Hexagon
