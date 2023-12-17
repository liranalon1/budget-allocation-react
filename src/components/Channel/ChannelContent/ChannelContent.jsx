import './ChannelContent.scss';

const ChannelContent = ({ children, isExpanded, id, expandedRowId }) => {
    return (
        <>
            {isExpanded && id === expandedRowId && (
                <div
                    className={`channel-content ${
                        isExpanded ? 'is-expanded' : ''
                    }`}
                >
                    {children}
                </div>
            )}
        </>
    );
};

export default ChannelContent;
