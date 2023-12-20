import { useState } from 'react';
import './TabContent1.scss';
import ChannelRow from '../Channel/ChannelRow/ChannelRow';
import ChannelContent from '../Channel/ChannelContent/ChannelContent';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import DropdownSelectOption from '../DropdownSelect/DropdownSelectOption';

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
                                <DropdownSelect
                                    defaultValue={selectedFrequency}
                                    handleChange={handleFrequencyChange}
                                    label="Budget Frequency"
                                >
                                    <DropdownSelectOption optionValue="annually">
                                        Annually
                                    </DropdownSelectOption>
                                    <DropdownSelectOption optionValue="monthly">
                                        Monthly
                                    </DropdownSelectOption>
                                    <DropdownSelectOption optionValue="quarterly">
                                        Quarterly
                                    </DropdownSelectOption>
                                </DropdownSelect>
                            </div>
                        </div>
                    </ChannelContent>
                </div>
            ))}
        </div>
    );
};
export default TabContent1;
