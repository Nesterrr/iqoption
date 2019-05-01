// @flow
import { css } from '@emotion/core';

export const style = {
    rootContainer: css`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 1200px;
        height: 1000px;
        outline: 2px solid rgba(0, 0, 0, 0.1);
    `,
    calendarContainer: css`
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 94%;
        outline: 2px solid rgba(0, 0, 0, 0.1);
        list-style: none;
    `,
    weekDays: css`
        width: 100%;
        text-align: right;
        list-style: none;
    `,
    weekDaysContainer: css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0;
        padding: 0;
    `,
    controls: css`
        display: flex;
        justify-content: center;
        align-self: flex-end;
        margin-right: 16px;

        & button {
            position: relative;
            margin-bottom: 16px;
            background-color: transparent;
            border: 1px solid rgba(0, 0, 0, 0.4);
            border-radius: 4px;
            margin-right: 2px;
            font-size: 1.4rem;
        }
    `,
    monthYear: css`
        position: absolute;
        top: 0px;
        left: 32px;
        font-size: 2rem;
        line-height: 2rem;
    `,

    nextBtn: css`
        height: 40px;
        width: 30px;

        & :after {
            content: '';
            position: absolute;
            right: 16px;
            top: 50%;
            display: block;
            border-left: 2px solid rgba(0, 0, 0, 0.8);
            border-top: 2px solid rgba(0, 0, 0, 0.8);
            width: 12px;
            height: 12px;
            float: right;
            transform: translate(50%, -50%) rotate(135deg);
        }
    `,

    prevBtn: css`
        height: 40px;
        width: 30px;

        & :after {
            content: '';
            position: absolute;
            right: 12px;
            top: 50%;
            display: block;
            border-left: 2px solid rgba(0, 0, 0, 0.8);
            border-top: 2px solid rgba(0, 0, 0, 0.8);
            width: 12px;
            height: 12px;
            float: right;
            transform: translate(50%, -50%) rotate(-45deg);
        }
    `,
};
