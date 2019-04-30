// @flow
import * as React from "react";
import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/utils';
import moment from 'moment';
import type Moment from 'moment';
import { range } from '../utils/range';
import Day from './Day';
import OffsetDays from './OffsetDays';

type PropsType = {
    currentDate: Moment
};

const monthContainer = (isOffsetExist: boolean): SerializedStyles => css`
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

export const Month =({
    currentDate,
}: PropsType
): React.Element<*> => {
    const currentYear = currentDate.year();
    const currentMonth = currentDate.month();
    const firstDayOfMonth = currentDate
        .startOf("month")
        .format("d");
    const daysInMonth = range(1, currentDate.daysInMonth());
    const isOffsetExist = firstDayOfMonth > 1;

    const today = Number(moment().format("D"));
    const getIsToday = (day: number): boolean => {
        return (currentYear === moment().year()) 
            && (currentMonth === moment().month())
            && (day === today)
     
    }

    const getIsWeekend = (day: number): boolean => {
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
                daysInMonth.map((day: number): React.Element<typeof Day> => {
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
};
