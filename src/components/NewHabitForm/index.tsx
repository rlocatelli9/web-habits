import { Check } from 'phosphor-react';
import React, { FormEvent, useCallback, useState } from 'react';
import { INewHabitForm } from '../../intefaces';
import { api } from '../../lib/axios';
import Checkbox from '../Checkbox';

import { AVAILABLE_WEEK_DAYS } from '../../utils/constants';

export const NewHabitForm: React.FC<INewHabitForm> = ({handleFeedbackAlert}) => {
  const [title, setTitle] = useState<string>('')
  const [weekdays, setWeekDays] = useState<number[]>([])


  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if(!title || weekdays.length === 0){
      handleFeedbackAlert({message: 'Por favor, preencha o formulário.', status: 'ERROR'})
      return 
    }

    await api.post('/habits', {title, weekdays})    

    handleFeedbackAlert({message: 'Seu novo hábito foi criado.', status: 'SUCCESS'})

    setTitle('')
    setWeekDays([])

  }

  const handleCheckbox = useCallback((day:number) => {
    if(weekdays.includes(day)) {
      const newWeekDays = weekdays.filter(weekDay => weekDay !== day).sort();
      setWeekDays(newWeekDays)
    } else {
      setWeekDays((oldState) => ([...oldState, day].sort()))
    }
  }, [weekdays])

  return (
      <form className="w-full flex flex-col mt-6" onSubmit={onSubmit}>
        <label htmlFor="title" className="font-semibold leading-tight">
          Qual o seu comprometimento?
        </label>

        <input 
          type="text" 
          id="title" 
          placeholder="ex.: Ler livro, Estudar, etc..." 
          className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder: text-zinc-400"      
          autoFocus
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="" className="font-semibold leading-tight mt-4">
          Qual a recorrência?
        </label>

        <div className="flex flex-col gap-2 mt-3">
          {AVAILABLE_WEEK_DAYS.map((day, index) => (
            <Checkbox 
              key={day}
              checked={weekdays.includes(index)}
              children={(
                <span className="text-white leading-tight">
                  {day}
                </span>
              )}                            
              onCheckedChange={() => handleCheckbox(index)}         
            />
          ))}
        </div>

        <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibol bg-green-600 hover:bg-green-500 transition-colors">
          <Check size={20} weight="bold" />
          Confirmar
        </button>
      </form>
  )
}
