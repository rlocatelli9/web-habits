import React from 'react';
import { generateDatesFromYearBeginning } from '../../utils/generate-dates-from-year-beginning';
import { HabitDay } from '../HabitDay';

const weekDays = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S',
]

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 //18 weeks
const ammountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length


export const SumaryTable: React.FC = () => {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {
          weekDays.map((day, index) => (
            <div 
              key={`${day}-${index}`} 
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {day}
            </div>
          ))
        }             
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3 overflow-x-auto">
        {
          summaryDates.map(date => (
            <HabitDay key={date.toString()}/>
          ))
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
