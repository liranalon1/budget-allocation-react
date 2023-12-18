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
                    name: value === '' ? 'New Channel' : value,
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

            <div className="channel-icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                >
                    <rect width="36" height="36" rx="3" fill="#FF9602" />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 10C8 8.895 8.895 8 10 8H24C25.105 8 26 8.895 26 10V11V16.6816C25.378 16.3856 24.707 16.1791 24 16.0781V12H10V24H16.0801C16.1811 24.707 16.3876 25.378 16.6836 26H10C8.897 26 8 25.103 8 24V12V10ZM13.7734 14.125V13H14.5684V14.1465C14.8204 14.1955 15.0508 14.2841 15.2578 14.4141C15.4648 14.5471 15.6392 14.7158 15.7832 14.9238C15.9272 15.1298 16.0382 15.3723 16.1172 15.6523C16.1962 15.9303 16.2344 16.2409 16.2344 16.5859H14.7461C14.7461 16.1659 14.6874 15.8525 14.5664 15.6445C14.4454 15.4385 14.2887 15.3359 14.0957 15.3359C13.9907 15.3359 13.9002 15.3583 13.8262 15.4043C13.7522 15.4533 13.6916 15.5176 13.6426 15.5996C13.5936 15.6816 13.5582 15.7797 13.5352 15.8887C13.5132 16.0007 13.502 16.12 13.502 16.25C13.502 16.378 13.515 16.4966 13.543 16.5996C13.571 16.7026 13.6157 16.7987 13.6777 16.8867C13.7397 16.9767 13.8199 17.0607 13.9199 17.1387C14.0189 17.2187 14.1392 17.3008 14.2832 17.3848C14.5712 17.5218 14.8343 17.6616 15.0723 17.8066C15.3103 17.9496 15.5155 18.1157 15.6875 18.3027C15.8595 18.4897 15.9919 18.708 16.0859 18.957C16.1789 19.207 16.2246 19.5008 16.2246 19.8398C16.2246 20.1438 16.1836 20.42 16.0996 20.666C16.0146 20.91 15.8942 21.1218 15.7402 21.3008C15.5862 21.4798 15.4006 21.6254 15.1816 21.7344C14.9626 21.8464 14.7201 21.9191 14.4531 21.9531V23H13.6641V21.9531C13.4181 21.9201 13.1811 21.8492 12.9531 21.7422C12.7261 21.6352 12.5247 21.4832 12.3477 21.2832C12.1707 21.0852 12.0288 20.8381 11.9238 20.5371C11.8188 20.2381 11.7656 19.8819 11.7656 19.4629H13.2559C13.2559 19.7129 13.2763 19.918 13.3203 20.082C13.3643 20.248 13.4221 20.3775 13.4961 20.4785C13.5701 20.5775 13.656 20.6495 13.752 20.6895C13.848 20.7295 13.9497 20.75 14.0547 20.75C14.1697 20.75 14.2695 20.7276 14.3555 20.6816C14.4415 20.6376 14.5124 20.5741 14.5684 20.4941C14.6244 20.4161 14.6673 20.3219 14.6953 20.2109C14.7233 20.1009 14.7363 19.9796 14.7363 19.8496C14.7363 19.7066 14.7233 19.5778 14.6953 19.4668C14.6673 19.3528 14.6216 19.2521 14.5586 19.1641C14.4956 19.0741 14.4144 18.9921 14.3184 18.9141C14.2214 18.8381 14.1058 18.7635 13.9688 18.6895C13.6778 18.5595 13.4119 18.4222 13.1719 18.2812C12.9309 18.1383 12.7267 17.9741 12.5547 17.7871C12.3827 17.6001 12.2493 17.3808 12.1543 17.1348C12.0593 16.8868 12.0117 16.5892 12.0117 16.2422C12.0117 15.9472 12.0547 15.6795 12.1387 15.4355C12.2237 15.1935 12.3421 14.9798 12.4961 14.7988C12.6501 14.6158 12.8348 14.4656 13.0508 14.3496C13.2668 14.2336 13.5064 14.159 13.7734 14.125ZM23 18C20.2 18 18 20.2 18 23C18 25.8 20.2 28 23 28C24 28 25.0008 27.6992 25.8008 27.1992L27.5996 29L29 27.5996L27.1992 25.8008C27.6992 25.0008 28 24 28 23C28 20.2 25.8 18 23 18ZM26 23C26 21.3 24.7 20 23 20C21.3 20 20 21.3 20 23C20 24.7 21.3 26 23 26C24.7 26 26 24.7 26 23Z"
                        fill="white"
                    />
                </svg>
            </div>

            {isEditMode ? (
                <input
                    type="text"
                    value={value}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleChannelName(e.target.value)}
                    onBlur={(e) => handleInputBlur(e.target.value)}
                    autoFocus
                />
            ) : (
                <div className="channel-name">{data.name}</div>
            )}

            <EditChannel data={data} setIsEditMode={setIsEditMode} />
        </div>
    );
};

export default ChannelRow;
