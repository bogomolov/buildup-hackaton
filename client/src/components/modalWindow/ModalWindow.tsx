import React, {SetStateAction, useEffect, useState} from 'react';

import './ModalWindow.scss';
import {setDataImMapItem} from '../../store/mapDrawData/mapDrawData.slice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/types';
// import {useMapData} from '../../store/mapDrawData/mapDrawData.selectors';
import Button from "../button/Button";
import {useMapFilter} from "../../store/mapDrawData/mapDrawData.selectors";

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
    const filter = useMapFilter();
    // const mapData = useMapData();

    useEffect(() => {
        if (show) {
            setTimeout(() => {setActive(true)}, 0);
        } else {
            setActive(false);
        }
    }, [show])
    const changeValueInMap = (firstIndex: number, secondIndex: number, type: 'school' | 'clinic' | 'hospital') => {
        dispatch(setDataImMapItem({
            x: secondIndex,
            z: firstIndex,
            changed: type
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
                        <Button handleClick={() => {
                            changeValueInMap(selectedItemPos.x, selectedItemPos.z, filter);
                            setShow(false);
                        }} title={'Добавить'} />
                    </div>
                </div>
            </div>
        );
    }
    return <></>
};

export default ModalWindow;
