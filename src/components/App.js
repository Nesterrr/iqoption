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
    height: 1000px;
    width: 1400px;
    // overflow: hidden;
    // margin-top: 1000px;
    outline: 4px solid black;
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
            subtrs: [-1, 0, 1],
        }
        this.state.date.locale('ru');

        this.onClick = this.onClick.bind(this);
    }
    onClick (value) {
        let newDate = Object.assign({}, this.state.date);
        const newNumber = moment(this.state.date).month() + value;
        newDate = moment(newDate).set("month", newNumber);
        this.setState({
            date: newDate,
        });
    }

    render() {
        const months = [];
        this.state.subtrs.forEach((subtr) => {
            let newDate = Object.assign({}, this.state.date);
            const currentMonthNumber = moment(this.state.date).month() + subtr;
            newDate = moment(newDate).set("month", currentMonthNumber);
            months.push(newDate);
        });

        if (this.todayRef) {
            console.log('todayRef: ', this.todayRef);
        }

        const renderer = () => ( 
            <div css={wrapper}>
                <ul css={calendarContainer(true)}>
                {
                    months.map(month => (
                        <Month
                            currentDate={month}
                            events={events}
                        />
                    ))
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
                { moment(this.state.date).format("MMMM") }
            </h2>,
            <List
                height={1000}
                rowHeight={1000}
                rowCount={1}
                width={1400}
                scrollToAlignment="center"
                rowRenderer={renderer}
            />
        ]);
    }
}

export default App;

// <div css={wrapper}>
//                 <ul css={calendarContainer(true)}>
//                 {
//                     months.map(month => (
//                         <Month
//                             currentDate={month}
//                             events={events}
//                         />
//                     ))
//                 }
//                 </ul>
//             </div>