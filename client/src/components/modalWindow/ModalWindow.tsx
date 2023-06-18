import React, {SetStateAction, useEffect, useState} from 'react';

import './ModalWindow.scss';
import {setDataImMapItem} from '../../store/mapDrawData/mapDrawData.slice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/types';
import {useMapData} from '../../store/mapDrawData/mapDrawData.selectors';
import Button from "../button/Button";

type ModalType = {
    show: boolean;

    setShow: React.Dispatch<SetStateAction<boolean>>;
    selectedItemPos : {
        x: number;
        z: number;
    };
}
const ModalWindow = ({show, setShow, selectedItemPos}: ModalType) => {
    const dispatch = useDispatch<AppDispatch>();
    const [active, setActive] = useState<boolean>(false);
    const mapData = useMapData();

    useEffect(() => {
        if (show) {
            setTimeout(() => {setActive(true)}, 0);
        } else {
            setActive(false);
        }
    }, [show])
    const changeValueInMap = (firstIndex: number, secondIndex: number) => {
        dispatch(setDataImMapItem({
            x: secondIndex,
            z: firstIndex,
            data: {
                colors: {
                    school: '#ffff00',
                    clinic: mapData[secondIndex][firstIndex].colors.clinic,
                    hospital: mapData[secondIndex][firstIndex].colors.hospital
                }
            }
        }));
    }

    if (show) {
        return (
            <div className={'modal__back'} onClick={() => setShow(false)}>
                <div className={`modal__window ${active ? 'modal__window_active' : ''}`} onClick={(e) => e.stopPropagation()}>
                    <div className={'modal__title-container'}>
                        <p className={'modal__title'}>
                            Выберите действие
                        </p>
                    </div>
                    <div className={'modal__body'}>

                    </div>
                    <Button handleClick={() => {
                        changeValueInMap(selectedItemPos.x, selectedItemPos.z);
                        setShow(false);
                    }} title={'Расчитать изменения'} />
                </div>
            </div>
        );
    }
    return <></>
};

export default ModalWindow;
