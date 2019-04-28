// @ flow
import React from "react";
import { css } from '@emotion/core';
import moment from 'moment';
import type Moment from 'moment';
import { range } from '../utils/range';
import { Day } from './Day';
import OffsetDays from './OffsetDays';

type Props = {
    monthNumber: Moment,
};

const monthContainer = (isOffsetExist) => css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0;
    width: 600px;
    margin: 0;
    padding: 0;
    margin-top: ${isOffsetExist ? `-200px` : `0`};

    &:first-child {
        margin-top: 0;
    }
`;

export const Month = React.memo(({
    currentDate,
}: Props) => {
    const firstDayOfMonth = moment(currentDate)
        .startOf("month")
        .format("d");
    const daysInMonth = range(1, moment(currentDate).daysInMonth());
    const isOffsetExist = firstDayOfMonth > 1;

    let today = null;
    if (moment(currentDate).month() === moment().month()) {
        today = parseInt(moment(currentDate).format("D"));
    }

    return (
        <ul css={monthContainer(isOffsetExist)}>
            {
                isOffsetExist
                ? <OffsetDays firstDayOfMonth={firstDayOfMonth} />
                : null
            }
            {
                daysInMonth.map((day) => (
                    <Day
                        number={day}
                        key={day}
                        isToday={today === day}
                    />
                ))
            }
        </ul>
    );
});
