import React, { Component } from "react";
import { css } from '@emotion/core';
import moment from 'moment';
import { List } from 'react-virtualized';
import { Month } from './Month.js';

const events = [
    {
      name: 'Евгений Голубцов',
      startDate: '15.05.2019',
      endDate: '26.05.2019',
    },
    {
      name: 'Валерия Борисова',
      startDate: '03.06.2019',
      endDate: '07.06.2019',
    },
    {
      name: 'Валерия Борисова',
      startDate: '27.05.2019',
      endDate: '31.05.2019',
    },
    {
      name: 'Андрей Копылов',
      startDate: '27.05.2019',
      endDate: '09.06.2019',
    },
    {
      name: 'Святослав Подмагаев',
      startDate: '22.04.2019',
      endDate: '30.04.2019',
    },
    {
      name: 'Кирилл Мельников',
      startDate: '14.04.2019',
      endDate: '30.04.2019',
    }
];

const calendarContainer = (prop) => css`
    position: absolute;
    // top: ${prop ? `200px` : `none`};
    margin-top: 0;
    margin-left: 0;
    padding: 0;
    // height: 1000px;
    width: 1400px;
    outline: 1px solid red;
    list-style: none;
`;

const wrapper = css`
    position: relative;
    // height: 1000px;
    width: 1400px;
    // overflow: hidden;
    // margin-top: 1000px;
    // outline: 4px solid black;
`;

const weekDays = css`
    width: 100%;
    text-align: right;
    list-style: none;
`;

const weekDaysContainer = css`
    display: flex;
    // background-color: red;
    margin: 0;
    padding: 0;
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().locale('ru'),
            offset: 0,
            weekDays: moment.weekdaysShort(),
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick (value) {
        this.setState(prevState => ({
            date: moment().locale('ru').add('M', prevState.offset + value),
            offset: prevState.offset + value,
        }));
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
                        events={events}
                    />
                }
                </ul>
            </div>
        );
        return ([
            <button
                onClick={() => this.onClick(-1)}
            >
                предыдущий месяц!
            </button>,
            <button
                onClick={() => this.onClick(1)}
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
