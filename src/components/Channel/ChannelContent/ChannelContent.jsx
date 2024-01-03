import './ChannelContent.scss';

const ChannelContent = ({ children, isExpanded }) => {
    return (
        <>
            {isExpanded && (
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
