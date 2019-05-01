// @flow
import * as React from "react";
import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/utils';
import moment from 'moment';
import type Moment from 'moment';
import { range } from '../../utils/range';
import { Day } from '../Day';
import { OffsetDays } from '../OffsetDays/';
import { style } from './style';

type PropsType = {
    currentDate: Moment,
    currentYear: number,
    currentMonth: string,
    currentMonthNumber: number
};

const SATURDAY = 5;
const SUNDAY = 6;
const FIRST_DAY_OF_MONTH = 1;

export const Month =({
    currentDate,
    currentYear,
    currentMonth,
    currentMonthNumber,
}: PropsType): React.Element<*> => {
    const firstDayOfMonth = currentDate
        .startOf("month")
        .format("d");
    const daysInMonth = range(1, currentDate.daysInMonth());
    const isOffsetExist = firstDayOfMonth > FIRST_DAY_OF_MONTH;

    const today = Number(moment().format("D"));
    const getIsToday = (day: number): boolean => {
        return (currentYear === moment().year()) 
            && (currentMonthNumber === moment().month())
            && (day === today)
     
    }

    const getIsWeekend = (day: number): boolean => {
        const currentDay = currentDate.day(day).format();
        console.log('currentDay', currentDay, day);
        return (currentDay === SATURDAY) || (currentDay === SUNDAY);
    }
    return (
        <ul
            css={style.monthContainer(isOffsetExist)}
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
                            monthName={(day === 1) ? currentMonth : null}
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
