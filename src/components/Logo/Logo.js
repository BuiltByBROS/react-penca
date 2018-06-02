import React from 'react';

import logoPenca from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={logoPenca} alt="Logo" />
    </div>
);

export default logo;
