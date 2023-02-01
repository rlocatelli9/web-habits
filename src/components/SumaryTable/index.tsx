import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { generateDatesFromYearBeginning } from '../../utils/generate-dates-from-year-beginning';
import { HabitDay } from '../HabitDay';

import { ISummary } from '../../interfaces';
import { WEEK_DAYS } from '../../utils/constants';

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 //18 weeks
const ammountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length


export const SumaryTable: React.FC = () => {
  const [summary, setSummary] = useState<ISummary>([])

  useEffect(() => {
    api.get('/summary').then((response) => {
      setSummary(response.data)
    })
  },[])


  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {
          WEEK_DAYS.map((day, index) => (
            <div 
              key={`${day}-${index}`} 
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {day}
            </div>
          ))
        }             
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-2 p-2 overflow-x-auto">
        {
          summary.length > 0 && summaryDates.map(date => {
            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            })

            return (
              <HabitDay 
                key={date.toString()}
                defaultCompleted={dayInSummary?.completed} 
                amount={dayInSummary?.amount}
                date={date}
              />
            )
          })
        }
        {ammountOfDaysToFill > 0 ? Array.from({length: ammountOfDaysToFill}).map((_, index) => (
          <div 
            key={index} 
            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
          />
        )): null}
      </div>
    </div>
  )
}
