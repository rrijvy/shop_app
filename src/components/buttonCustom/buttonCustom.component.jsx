import React from "react";

import "./buttonCustom.styles.scss";

const ButtonCustom = ({children, handleClick, ...otherProps}) => {
    let className = `custom-button`;
    return (
        <button className={className} onClick={handleClick} {...otherProps}>
            {children}
        </button>
    )
}

export default ButtonCustom;