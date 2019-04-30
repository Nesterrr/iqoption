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
    }
`;

export const Month = React.memo(React.forwardRef(({
    currentDate,
}: Props,
    ref,
) => {
    const currentYear = currentDate.year();
    const currentMonth = currentDate.month();
    const firstDayOfMonth = currentDate
        .startOf("month")
        .format("d");
    const daysInMonth = range(1, currentDate.daysInMonth());
    const isOffsetExist = firstDayOfMonth > 1;

    const today = Number(moment().format("D"));
    const getIsToday = (day) => {
        return (currentYear === moment().year()) 
            && (currentMonth === moment().month())
            && (day === today)
     
    }

    // const prevMonthNum = currentMonth - 1;
    // const prevMonth = currentDate.month(prevMonthNum);
    // const firstDayOfPrevMonth = Number(
    //     prevMonth
    //         .startOf("month")
    //         .format("d")
    // );

    const getIsWeekend = (day) => {
        const currentDay = currentDate.weekday(day);
        return (currentDay === 6) || (currentDay === 5);
    }
    return (
        <ul
            css={monthContainer(isOffsetExist)}
        >
            {
                isOffsetExist
                ? <OffsetDays firstDayOfMonth={firstDayOfMonth} />
                : null
            }
            {
                daysInMonth.map((day) => {
                    const isWeekend = getIsWeekend(day);
                    const isToday = getIsToday(day);
                    return (
                        <Day
                            number={day}
                            key={day}
                            isToday={isToday}
                            isWeekend={isWeekend}
                        />
                    )
                })
            }
        </ul>
    );
}));
