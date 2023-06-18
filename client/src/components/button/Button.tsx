import React from 'react';
import './Button.scss';

type ButtonPropsType = {
    handleClick: () => void;
    title: string
}
const Button = ({handleClick, title}: ButtonPropsType) => {
    return <button className={'button'} onClick={handleClick}>{title}</button>;
};

export default Button;
