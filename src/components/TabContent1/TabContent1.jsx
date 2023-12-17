import { useState } from 'react';
import './TabContent1.scss';
import ChannelRow from '../Channel/ChannelRow/ChannelRow';
import ChannelContent from '../Channel/ChannelContent/ChannelContent';

const TabContent1 = ({ channelData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);

    return (
        <div className="tab-content1 flex">
            {channelData.map((row) => (
                <div className="channel-wrap" key={row.id}>
                    <ChannelRow
                        data={row}
                        isExpanded={isExpanded}
                        setIsExpanded={setIsExpanded}
                        expandedRowId={expandedRowId}
                        setExpandedRowId={setExpandedRowId}
                    />

                    <ChannelContent
                        isExpanded={isExpanded}
                        id={row.id}
                        expandedRowId={expandedRowId}
                    >
                        working !!!!!!!!!!!!!!!!!!!!
                    </ChannelContent>
                </div>
            ))}
        </div>
    );
};
export default TabContent1;
