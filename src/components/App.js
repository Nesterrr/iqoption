// @flow
import * as React from "react";
import { css } from '@emotion/core';
import moment from 'moment';
import type Moment from 'moment';
import { Month } from './Month.js';


type StateType = {
    date: Moment,
    offset: number,
    weekDays: Array<string>
};

const calendarContainer = css`
    position: absolute;
    margin-top: 0;
    margin-left: 0;
    padding: 0;
    width: 1400px;
    outline: 1px solid red;
    list-style: none;
`;

const wrapper = css`
    position: relative;
    width: 1400px;
`;

const weekDays = css`
    width: 100%;
    text-align: right;
    list-style: none;
`;

const weekDaysContainer = css`
    display: flex;
    margin: 0;
    padding: 0;
`;

class App extends React.Component<void, StateType> {
    constructor(props: void) {
        super(props);
        this.state = {
            date: moment().locale('ru'),
            offset: 0,
            weekDays: moment.weekdaysShort(),
        }
    }

    handleChangeMonth = ({ target }: SyntheticInputEvent<EventTarget>) => {
        const { id } = target;

        const toNextToPrev = (value: number) => {
            this.setState((
                prevState: StateType
            ): { date: Moment, offset: number } => ({
                date: moment().locale('ru').add('M', prevState.offset + value),
                offset: prevState.offset + value,
            }));
        }

        switch (id) {
            case 'prevBtn':
                toNextToPrev(-1);
                break;
            case 'currentBtn':
                this.setState({
                    date: moment().locale('ru'),
                    offset: 0,
                });
                break;
            case 'nextBtn':
                toNextToPrev(1);
                break;
            default:
                toNextToPrev(1);
        }
    }

    render(): Array<React.Element<*>> {
        return ([
            <button
                id="prevBtn"
                key="prevBtn"
                onClick={this.handleChangeMonth}
            >
                предыдущий месяц!
            </button>,
            <button
                id="currentBtn"
                key="currentBtn"
                onClick={this.handleChangeMonth}
            >
                сегодня
            </button>,
            <button
                id="nextBtn"
                key="nextBtn"
                onClick={this.handleChangeMonth}
            >
                слудующий месяц!
            </button>,
            <h2 key="header">
                { this.state.date.format("MMMM") }
            </h2>,
            <div css={wrapper} key="wrapper">
                <ul css={weekDaysContainer}>
                {
                    this.state.weekDays.map((weekDay: string): React.Element<'li'> => (
                        <li css={weekDays} key={weekDay}>
                            {weekDay}
                        </li>
                    ))
                }
                </ul>
                <div css={calendarContainer}>
                {
                    <Month
                        currentDate={this.state.date}
                        events="events"
                    />
                }
                </div>
            </div>
        ]);
    }
}

export default App;
