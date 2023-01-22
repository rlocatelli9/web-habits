import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import Checkbox from '../Checkbox';
import ProgressBar from '../ProgressBar';

import { IHabitDay } from '../../intefaces';

export const HabitDay: React.FC<IHabitDay> = ({completed = 0, amount = 0, date}) => {

  const returnProgress = () => {
    if(amount > 0) {
      const result = Math.round((completed/amount) * 100)
      if(result <= 100) return result
      else return 100
    }
    return 0
  }

  const progress = returnProgress()

  const dayInMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')
 
  return (
    <Popover.Root>
    <Popover.Trigger 
      className={clsx("w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg", {
        'bg-zinc-900 border-zinc-800' : progress === 0,
        'bg-violet-400 border-violet-500': progress > 0 && progress < 20,
        'bg-violet-500 border-violet-400': progress >= 20 && progress < 40,
        'bg-violet-600 border-violet-500': progress >= 40 && progress < 60,
        'bg-violet-700 border-violet-600': progress >= 60 && progress < 80,
        'bg-violet-800 border-violet-700': progress >= 80 && progress < 90,
        'bg-violet-900 border-[#240641]': progress >= 90 && progress < 100,
        'bg-[#16002A] border-[#240641]': progress === 100,
      })}
    />
    <Popover.Portal>
      <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
        <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
        <span className="mt-1 font-extrabold leading-tight text-3xl">{dayInMonth}</span>

        <ProgressBar value={completed} max={amount} progress={progress} />

        <Checkbox
          onCheckedChange={()=>{}}
          children={(
            <span className="text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              Beber 2L de água
            </span>
          )}
        />
        <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>        
  )
}
