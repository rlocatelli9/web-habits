import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Checkbox from '../Checkbox';
import dayjs from 'dayjs';

import { api } from '../../lib/axios';

import { IHabitsList, IPossibleHabitsList } from '../../interfaces';

export const HabitsList: React.FC<IHabitsList> = ({date, onCompletedChange}) => {
  const [possibleHabits, setPossibleHabits] = useState<IPossibleHabitsList[]>([])
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  useEffect(() => {
    api.get('day', {
      params: {
        date: date.toISOString()
      }
    }).then(response => {
      setPossibleHabits(response.data.possibleHabits)
      setCompletedHabits(response.data.completedHabits)
    })
  }, [])

  const handleToggleHabit = useCallback(async (habitId:string) => {
    await api.patch(`/habits/${habitId}/toggle`)
    
    let newCompletedHabits: string[] = []

    const isHabitAlreadyCompleted = completedHabits.includes(habitId)

    if(isHabitAlreadyCompleted){
      newCompletedHabits = completedHabits.filter(id => id !== habitId)    
    } else {
      newCompletedHabits = [...completedHabits, habitId]      
    }

    setCompletedHabits(newCompletedHabits)

    onCompletedChange(newCompletedHabits.length)
    
  }, [onCompletedChange, completedHabits, api])

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  
  const habitsElements = possibleHabits.map(habit => (
    <Checkbox
      key={habit.id}
      id={habit.id}    
      defaultChecked={completedHabits.includes(habit.id)}     
      disabled={isDateInPast}   
      onCheckedChange={() => handleToggleHabit(habit.id)}
      children={(
        <span className="text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
          {habit.title}
        </span>
      )}
    />
  ))

  return (
    <Fragment>
      {habitsElements}
    </Fragment>
  )
}
