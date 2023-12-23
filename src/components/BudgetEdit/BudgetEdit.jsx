import './BudgetEdit.scss';
import { useContext, useState } from 'react';
import { channelContext } from '../../App';
import ChannelMonthRow from '../Channel/ChannelMonthRow/ChannelMonthRow';

const BudgetEdit = () => {
    const { channels, setChannels } = useContext(channelContext);

    return (
        <div className="budget-edit flex">
            <p>This is budget edit component</p>

            {channels.map((channel, i) => (
                <div className="channel-months-wrap" key={channel.id}>
                    <ChannelMonthRow data={channel} channelIndex={i} />
                </div>
            ))}
        </div>
    );
};
export default BudgetEdit;
