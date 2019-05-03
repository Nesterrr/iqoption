// @flow
import * as React from "react";
import { css } from '@emotion/core';
import moment from 'moment';
import type Moment from 'moment';
import { Page } from '../Page';
import { momentCreator } from '../../utils/momentCreator';
import { range } from '../../utils/range';
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
                date: momentCreator().add(prevState.offset + value, 'M'),
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

    render(): React.Element<*> {
        const {
            date,
            offset,
        } = this.state;

        const currentYear = date.year();

        const createPage = (): {
            page: Array<{
                dateString: string,
                number: number,
                partName: string
            }>,
            lengthOfNextMonth: number
        } => {
            const PAGE_LENGTH = 42;
            let firstDayOfCurrentMonth = Number(date
                .startOf("month")
                .format("d"));
            if (firstDayOfCurrentMonth === 0) {
                firstDayOfCurrentMonth = 7;
            }
            const lengthOfCurrentMonth = date.daysInMonth();
            const lengthOfPrevMonth = (Number(firstDayOfCurrentMonth) - 2);

            const createPagePart = (
                length: number,
                pageNumbresPart: Array<number>,
                monthNumber: number,
                yearNumber: number,
                partName: string
            ): Array<{
                number: number,
                dateString: string,
                partName: string
            }> => {
                return pageNumbresPart.map((day: number): {
                    number: number,
                    dateString: string,
                    partName: string
                } => {
                    const dateString = momentCreator().
                        date(day).
                        month(monthNumber).
                        year(yearNumber).
                        format('YYYY-MM-DD');
                    return ({
                        number: day,
                        dateString,
                        partName
                    });
                });
            }

            const lastDayOfPrevMonth = Number(momentCreator().
                add(offset - 1, 'M').
                daysInMonth());

            const prevMonthNumbers = range(lastDayOfPrevMonth - lengthOfPrevMonth, lastDayOfPrevMonth);
            const currentMonthNumbers = range(1, lengthOfCurrentMonth);

            const prevMonth = createPagePart(
                lengthOfPrevMonth,
                prevMonthNumbers,
                momentCreator().add(offset - 1, 'M').month(),
                momentCreator().add(offset - 1, 'M').year(),
                'prev'
            );

            const currentMonth = createPagePart(
                lengthOfCurrentMonth,
                currentMonthNumbers,
                momentCreator().add(offset, 'M').month(),
                momentCreator().add(offset, 'M').year(),
                'current'
            );

            const lengthOfNextMonth = PAGE_LENGTH - prevMonth.length - currentMonth.length;
            const nextMonthNumbers = range(1, lengthOfNextMonth);
            const nextMonth = createPagePart(
                lengthOfNextMonth,
                nextMonthNumbers,
                momentCreator().add(offset + 1, 'M').month(),
                momentCreator().add(offset + 1, 'M').year(),
                'next'
            );
            return {
                page: [
                    ...prevMonth,
                    ...currentMonth,
                    ...nextMonth
                ],
                lengthOfNextMonth: nextMonth.length
            }
        }
        const currentPage = createPage();
        return (
            <div css={style.rootContainer}>
                <div css={style.controls}>
                    <button
                        key="prevBtn"
                        id="prevBtn"
                        onClick={this.handleChangeMonth}
                        css={style.prevBtn}
                    >
                    </button>
                    <button
                        key="currentBtn"
                        id="currentBtn"
                        onClick={this.handleChangeMonth}
                    >
                        сегодня
                    </button>
                    <button
                        id="nextBtn"
                        key="nextBtn"
                        onClick={this.handleChangeMonth}
                        css={style.nextBtn}
                    >
                    </button>
                </div>
                <h2 key="header" css={style.monthYear}>
                    { date.format("MMMM") }
                    {" "}
                    { currentYear }
                    {" "}г.
                </h2>
                <div css={style.calendarContainer}>
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
                    <Page
                        days={currentPage.page}
                    />
                </div>
            </div>
        );
    }
}

export default App;
