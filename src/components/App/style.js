// @flow
import { css } from '@emotion/core';

export const style = {
    calendarContainer: css`
        position: absolute;
        margin-top: 0;
        margin-left: 0;
        padding: 0;
        width: 1400px;
        outline: 1px solid red;
        list-style: none;
    `,

    wrapper: css`
        position: relative;
        width: 1400px;
    `,

    weekDays: css`
        width: 100%;
        text-align: right;
        list-style: none;
    `,

    weekDaysContainer: css`
        display: flex;
        margin: 0;
        padding: 0;
    `
};
