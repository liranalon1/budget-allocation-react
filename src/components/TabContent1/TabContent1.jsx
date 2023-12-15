import { useState } from 'react';

import ChannelRow from '../ChannelRow/ChannelRow';

const TabContent1 = ({ channelData }) => {
    const [isExpanded, setIsExpanded] = useState(false || channelData.id === 1);

    return (
        <div className="tabContent1">
            <div>
                {channelData.map((row) => (
                    <>
                        <ChannelRow
                            key={row.id}
                            data={row}
                            isExpanded={isExpanded}
                            setIsExpanded={setIsExpanded}
                        />

                        {isExpanded && (
                            <div
                                className={`channel-content ${
                                    isExpanded ? 'isExpanded' : ''
                                }`}
                            >
                                working !!!!!!!!!!!!!!!!!!!!
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};
export default TabContent1;
