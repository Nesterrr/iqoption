// @ flow
import React from "react";
import { css } from '@emotion/core';
import moment from 'moment';
import { range } from '../utils/range';

type Props = {
    monthNumber: number | string,
};

const dayContainer = css`
    width: 200px;
    height: 200px;
    list-style: none;
    outline: 1px solid green;
`;

const monthContainer = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    margin: 0;
    padding: 0;
`;

export const Month = React.memo(({
    monthNumber,
}: Props) => {
    const currentData = moment();
    const firstDayOfMonth = currentData
        .set("month", monthNumber)
        .startOf("month")
        .format("d");
    const daysInMonth = range(1, currentData.daysInMonth());

    console.log(
        'firstDayOfMonth: ',
        firstDayOfMonth,
        daysInMonth,
    );
    return (
        <ul css={monthContainer}>
            {
                firstDayOfMonth > 1
                ? <OffsetDays firstDayOfMonth={firstDayOfMonth} />
                : null
            }
            {
                daysInMonth.map((day) => (
                    <li
                        key={day}
                        css={dayContainer}
                    >
                        {day}
                    </li>
                ))
            }
        </ul>
    );
});

const offsetDay = css`
    position: static;
`;

const OffsetDays = React.memo(({ firstDayOfMonth }) => {
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
                        />
                    )
                })
            }
        </React.Fragment>
    )
});

const Day = React.memo(({ number }) => (
    <li css={dayContainer}>
        {
            number === 0
            ? ("")
            : { number }
        }
    </li>
));