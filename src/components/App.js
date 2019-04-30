// @flow
import React, { Component } from "react";
import { css } from '@emotion/core';
import moment from 'moment';
import type Moment from 'moment';
import { Month } from './Month.js';


type State = {
    date: Moment,
    offset: number,
    weekDays: Array<string>,
}


const calendarContainer = (prop) => css`
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

class App extends Component<State, Props> {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().locale('ru'),
            offset: 0,
            weekDays: moment.weekdaysShort(),
        }

        this.handleChangeMonth = this.handleChangeMonth.bind(this);
    }

    handleChangeMonth (e: SyntheticEvent<HTMLButtonElement>) {
        const { target } = e; 

        const toNextToPrev = (value: number) => {
            this.setState(prevState => ({
                date: moment().locale('ru').add('M', prevState.offset + value),
                offset: prevState.offset + value,
            }));
        }

        switch (target.id) {
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

    render() {
        const renderer = () => ( 
            <div css={wrapper}>
                <ul css={weekDaysContainer}>
                {
                    this.state.weekDays.map(weekDay => (<li css={weekDays}>{weekDay}</li>))
                }
                </ul>
                <ul css={calendarContainer(true)}>
                {
                    <Month
                        currentDate={this.state.date}
                        events="events"
                    />
                }
                </ul>
            </div>
        );
        return ([
            <button
                id="prevBtn"
                onClick={this.handleChangeMonth}
            >
                предыдущий месяц!
            </button>,
            <button
                id="currentBtn"
                onClick={this.handleChangeMonth}
            >
                сегодня
            </button>,
            <button
                id="nextBtn"
                onClick={this.handleChangeMonth}
            >
                слудующий месяц!
            </button>,
            <h2>
                { this.state.date.format("MMMM") }
            </h2>,
            renderer()
        ]);
    }
}

export default App;
