import React from 'react';
import { useSelector } from 'react-redux';

const ShowMsg = ({color = '#333' ,children}) => {
    const {theme} = useSelector(state=> state.app)
    const msg = {
        textAlign: 'center',
        fontSize: '28px',
        fontWidth: 'bold',
        textTransform: 'capitalize',
        color: `${color == '#333' && theme == 'DARK' ? "#fff" : color}`
    }
    return (
        <div style={msg}>
            <h1>{children}</h1>
        </div>
    );
};

export default ShowMsg;