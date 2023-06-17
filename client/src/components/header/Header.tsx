import React from 'react';

import {useDispatch} from 'react-redux';
import {AppDispatch} from 'src/store/types';
import {setFilter} from 'src/store/mapDrawData/mapDrawData.slice';

import './Header.scss';
import Button from "../button/Button";

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={'header'}>
            <div>

            </div>
            <div className={'header__button-container'}>
                <Button handleClick={() => dispatch(setFilter('school'))} title={'школы'}/>
                <Button handleClick={() => dispatch(setFilter('hospital'))} title={'Больницы'}/>
                <Button handleClick={() => dispatch(setFilter('clinic'))} title={'Клиники и травмпункты'}/>
            </div>
        </div>
    );
};

export default Header;
