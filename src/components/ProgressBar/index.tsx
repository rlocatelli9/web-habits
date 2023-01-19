import * as Progress from '@radix-ui/react-progress';
import React from 'react';

interface ProgressBarProps {
  completed: number;
  amount: number;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({completed, amount, progress}) => {
  
  return (
    <Progress.Root 
      value={completed}
      max={amount}  
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