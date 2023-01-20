import { Check } from 'phosphor-react';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import Checkbox from '../Checkbox';



const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]


export const NewHabitForm: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    console.log({title, weekDays})
    
  }

  const handleInput = (event: ChangeEvent) => {
    const { title } = event.target as typeof event.target & { title: string };
    setTitle(title)
  }

  const handleCheckbox = useCallback((day:number) => {
    if(weekDays.includes(day)) {
      const newWeekDays = weekDays.filter(weekDay => weekDay !== day).sort();
      setWeekDays(newWeekDays)
    } else {
      setWeekDays((oldState) => ([...oldState, day].sort()))
    }
  }, [weekDays])

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
        onChange={handleInput}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((day, index) => (
          <Checkbox 
            key={day} 
            contentLabel={(
              <span className="text-white leading-tight">
                {day}
              </span>
            )}   
            onCheckedChange={() => handleCheckbox(index)}         
          />
        ))}
      </div>

      <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibol bg-green-600 hover:bg-green-500">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
