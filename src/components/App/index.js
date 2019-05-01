// @flow
import * as React from "react";
import { css } from '@emotion/core';
import moment from 'moment';
import type Moment from 'moment';
import { Month } from '../Month';
import { momentCreator } from '../../utils/momentCreator';
import { style } from './style.js';

type StateType = {
    date: Moment,
    offset: number
};

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const INITIAL_OFFSET = 0;
const INCREMENT_VALUE = 1;
const DECREMENT_VALUE = -1;

class App extends React.Component<void, StateType> {
    constructor() {
        super();
        this.state = {
            date: momentCreator(),
            offset: INITIAL_OFFSET,
        }
    }

    handleChangeMonth = ({ target }: SyntheticInputEvent<EventTarget>) => {
        const { id } = target;

        const toNextToPrev = (value: number) => {
            this.setState((
                prevState: StateType
            ): { date: Moment, offset: number } => ({
                date: momentCreator().add('M', prevState.offset + value),
                offset: prevState.offset + value,
            }));
        }

        switch (id) {
            case 'prevBtn':
                toNextToPrev(DECREMENT_VALUE);
                break;
            case 'currentBtn':
                this.setState({
                    date: momentCreator().locale('ru'),
                    offset: INITIAL_OFFSET,
                });
                break;
            case 'nextBtn':
                toNextToPrev(INCREMENT_VALUE);
                break;
            default:
                toNextToPrev(INCREMENT_VALUE);
        }
    }

    render(): Array<React.Element<*>> {
        const {
            date,
        } = this.state;

        const currentYear = date.year();
        const currentMonthNumber = date.month();
        return ([
            <button
                key="prevBtn"
                id="prevBtn"
                onClick={this.handleChangeMonth}
            >
                предыдущий месяц!
            </button>,
            <button
                key="currentBtn"
                id="currentBtn"
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
                { date.format("MMMM") }
                {" "}
                { currentYear }
            </h2>,
            <div
                key="wrapper"
                css={style.wrapper}
            >
                <ul css={style.weekDaysContainer}>
                {
                    WEEK_DAYS.map((
                        weekDay: string
                    ): React.Element<'li'> => (
                        <li
                            key={weekDay}
                            css={style.weekDays}
                        >
                            {weekDay}
                        </li>
                    ))
                }
                </ul>
                <div css={style.calendarContainer}>
                {
                    <Month
                        currentDate={date}
                        events="events"
                        currentYear={currentYear}
                        currentMonthNumber={currentMonthNumber}
                        currentMonth={date.format("MMMM")}
                    />
                }
                </div>
            </div>
        ]);
    }
}

export default App;
