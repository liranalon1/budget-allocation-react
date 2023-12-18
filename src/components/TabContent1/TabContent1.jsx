import { useState } from 'react';
import './TabContent1.scss';
import ChannelRow from '../Channel/ChannelRow/ChannelRow';
import ChannelContent from '../Channel/ChannelContent/ChannelContent';
import Arrow from '../../components/Arrow/Arrow';

const TabContent1 = ({ channelData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const [selectedFrequency, setSelectedFrequency] = useState('annually');

    const handleFrequencyChange = (e) => {
        setSelectedFrequency(e.target.value);
    };

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
                        <div className="budget-wrap">
                            <div className="budget-top-items flex">
                                <div className="budget-item">
                                    <div className="top-item flex">
                                        <label>Budget Frequency</label>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M0 6C0 2.69351 2.69351 0 6 0C9.30649 0 12 2.69351 12 6C12 9.30649 9.30649 12 6 12C2.69351 12 0 9.30649 0 6ZM11.0769 6.00002C11.0769 3.19112 8.8089 0.923096 6 0.923096C3.19111 0.923096 0.92308 3.19112 0.92308 6.00002C0.92308 8.80891 3.19111 11.0769 6 11.0769C8.8089 11.0769 11.0769 8.80891 11.0769 6.00002ZM5.53847 2.76923V3.6923H6.46154V2.76923H5.53847ZM5.53847 9.23074V4.61536H6.46154V9.23074H5.53847Z"
                                                fill="#99A4C2"
                                            />
                                        </svg>
                                    </div>

                                    <div className="select btn dark">
                                        <select
                                            className="flex"
                                            value={selectedFrequency}
                                            onChange={handleFrequencyChange}
                                        >
                                            <option value="annually" selected>
                                                Annually
                                            </option>
                                            <option value="monthly">
                                                Monthly
                                            </option>
                                            <option value="quarterly">
                                                Quarterly
                                            </option>
                                        </select>
                                        <Arrow />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ChannelContent>
                </div>
            ))}
        </div>
    );
};
export default TabContent1;
