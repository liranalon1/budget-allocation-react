import './ChannelRow.scss';
import Arrow from '../../Arrow/Arrow';
import EditChannel from './EditChannel/EditChannel';

const ChannelRow = ({
    data,
    isExpanded,
    setIsExpanded,
    expandedRowId,
    setExpandedRowId,
}) => {
    const handleToggle = (id) => {
        setIsExpanded(!isExpanded);
        setExpandedRowId(id);
    };

    return (
        <div
            className={`channel-row flex ${
                isExpanded && data.id === expandedRowId ? 'is-expanded' : ''
            }`}
            onClick={() => handleToggle(data.id)}
        >
            <Arrow />
            {data.name}

            <EditChannel data={data}/>
        </div>
    );
};

export default ChannelRow;
