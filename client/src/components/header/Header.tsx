import React from 'react';

import {useDispatch} from 'react-redux';
import {AppDispatch} from 'src/store/types';
import {setFilter} from 'src/store/mapDrawData/mapDrawData.slice';

import Button from 'src/components/button/Button';

import logoOrange from './assets/images/logo-orange.png';

import './Header.scss';

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={'header'}>
            <div className={'header__logo-container'}>
                <img className={'header__logo'} src={logoOrange}/>
                <p className={'header__logo-text'}>
                    Sodi
                </p>
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
