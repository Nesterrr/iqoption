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

const monthContainer = (isOffsetExist, prevMonthLength) => css`
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0;
    width: 600px;
    padding: 0;
    margin-top: ${isOffsetExist ? `-200px` : `0`};

    &:first-child {
        margin-top: 0;
        // margin-top: ${prevMonthLength};
    }
`;

export const Month = React.memo(React.forwardRef(({
    currentDate,
}: Props,
    ref,
) => {
    const firstDayOfMonth = moment(currentDate)
        .startOf("month")
        .format("d");
    const daysInMonth = range(1, moment(currentDate).daysInMonth());
    const isOffsetExist = firstDayOfMonth > 1;

    let today = null;
    if (moment(currentDate).month() === moment().month()) {
        today = parseInt(moment(currentDate).format("D"));
    }

    const prevMonthNum = moment(currentDate).month() - 1;
    const prevMonth = moment(currentDate).month(prevMonthNum);
    const prevMonthLength = Number(moment(currentDate).month(prevMonthNum).daysInMonth());
    const firstDayOfPrevMonth = Number(moment(prevMonth)
        .startOf("month")
        .format("d"));

    const toCompare = prevMonthLength + firstDayOfPrevMonth;
    const getMarginTop = (value) => {
            if (value > 35) {
                console.log(': 1', value === firstDayOfPrevMonth + prevMonthLength);
                return '-1000px';
            }
            // if ((value < 34) && (value > 29)) {
            //     console.log(': ', value, firstDayOfPrevMonth + prevMonthLength);
            //     return '-800px';
            // }
            // return '-800px';
        }

    return (
        <ul
            css={monthContainer(isOffsetExist, getMarginTop(toCompare))}
        >
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
}));
