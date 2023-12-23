import './BudgetEdit.scss';
import { useContext, useState } from 'react';
import { channelContext } from '../../App';
import { months } from '../../helpers';
import ChannelMonthRow from '../Channel/ChannelMonthRow/ChannelMonthRow';

const BudgetEdit = () => {
    const { channels, setChannels } = useContext(channelContext);

    return (
        <div className="budget-edit">
            <div className="gradient-bg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="128"
                    viewBox="0 0 80 128"
                    fill="none"
                >
                    <rect
                        opacity="0.5"
                        width="80"
                        height="128"
                        fill="url(#paint0_linear_708_994)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_708_994"
                            x1="0"
                            y1="128"
                            x2="80"
                            y2="128"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#A9B5D2" stopOpacity="0.01" />
                            <stop
                                offset="1"
                                stopColor="#707EA7"
                                stopOpacity="0.134454"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="top flex">
                <div className="left-side flex">Channel</div>
                <div className="right-side flex">
                    {months.map((month, index) => (
                        <div
                            className="months-list"
                            key={index}
                        >{`${month} 21`}</div>
                    ))}
                </div>
            </div>

            {channels.map((channel, i) => (
                <ChannelMonthRow
                    channel={channel}
                    channelIndex={i}
                    key={channel.id}
                />
            ))}
        </div>
    );
};

export default BudgetEdit;
