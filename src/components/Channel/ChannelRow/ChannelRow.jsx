import './ChannelRow.scss';
import Arrow from '../../Arrow/Arrow';
import EditChannel from './EditChannel/EditChannel';
import { useContext, useState } from 'react';
import { context } from '../../../App';

const ChannelRow = ({
    data,
    isExpanded,
    setIsExpanded,
    expandedRowId,
    setExpandedRowId,
}) => {
    const { channelData, setChannelData } = useContext(context);
    const [value, setValue] = useState(data.name);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleToggle = (id) => {
        setIsExpanded(!isExpanded);
        setExpandedRowId(id);
    };

    const handleChannelName = (value) => {
        setValue(value);
    };

    const handleInputBlur = (value) => {
        handleChannelName(value);

        const updatedData = channelData.map((i) => {
            if (i.id === data.id) {
                const obj = {
                    id: data.id,
                    name: value,
                };
                return { ...i, ...obj };
            }
            return i;
        });
        setChannelData(updatedData);

        setIsEditMode(false);
    };

    return (
        <div
            className={`channel-row flex ${
                isExpanded && data.id === expandedRowId ? 'is-expanded' : ''
            }`}
            onClick={() => handleToggle(data.id)}
        >
            <Arrow />

            {isEditMode ? (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChannelName(e.target.value)}
                    onBlur={(e) => handleInputBlur(e.target.value)}
                    autoFocus
                />
            ) : (
                data.name
            )}

            <EditChannel data={data} setIsEditMode={setIsEditMode} />
        </div>
    );
};

export default ChannelRow;
