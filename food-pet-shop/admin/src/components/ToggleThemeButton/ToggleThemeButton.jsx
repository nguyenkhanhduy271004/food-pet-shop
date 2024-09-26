import React from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'; // Adjusted to correct package name
import './ToggleThemeButton.scss';
import { Button } from 'antd';

function ToggleThemeButton({ darkTheme, toggleTheme }) {
    return (
        <div className='toggle-theme-btn'>
            <Button onClick={toggleTheme}>
                {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
            </Button>
        </div>
    );
}

export default ToggleThemeButton;
