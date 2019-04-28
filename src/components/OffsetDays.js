// @flow
import React from 'react';
import { Day } from './Day';
import { range } from '../utils/range';

type Props = {
    firstDayOfMonth: string | number,
};

const OffsetDays = ({
    firstDayOfMonth,
}: Props) => {
    const emptyBlocks = range(1, parseInt(firstDayOfMonth) - 1);
    return (
        <React.Fragment>
            {
                emptyBlocks.map((offsetDay) => {
                    const key = `${offsetDay}-offset`;
                    return (
                        <Day
                            key={key}
                            number={0}
                            isEmpty
                        />
                    )
                })
            }
        </React.Fragment>
    )
};

export default OffsetDays;