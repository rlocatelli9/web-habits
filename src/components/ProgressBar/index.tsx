import * as Progress from '@radix-ui/react-progress';
import React from 'react';
import { IProgressBar } from '../../intefaces';


const ProgressBar: React.FC<IProgressBar> = ({value, max, progress}) => {
  
  return (
    <Progress.Root 
      value={value}
      max={max}  
      getValueLabel={(value: number, max: number) =>{
        return `${value} hábitos de ${max} foram completados nesse dia`
      }}

      className="h-3 rounded-xl bg-zinc-700 w-full mt-4"
    >
      <Progress.Indicator 
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: `${progress}%`}}
      />
    </Progress.Root>
  )
}

export default ProgressBar;