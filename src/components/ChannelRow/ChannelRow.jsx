import './ChannelRow.scss';
import { useState } from 'react';
import ArrowDown from '../ArrowDown/ArrowDown';

const ChannelRow = ({ data, isExpanded, setIsExpanded }) => {
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="channel-row-wrap">
            <div className="channel-row" onClick={handleToggle}>
                <ArrowDown />
                {data.name}
            </div>

         
        </div>
    );
};

export default ChannelRow;