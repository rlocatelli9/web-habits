import React, {ReactElement} from 'react';
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react';

type CheckedState = boolean | 'indeterminate';

interface CheckboxProps {
  contentLabel: ReactElement;
  onCheckedChange(checked: CheckedState): void
}

const Checkbox: React.FC<CheckboxProps> = ({contentLabel, onCheckedChange}) => {
  if(!contentLabel) return null

  /**
   * <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
          Beber 2L de água
        </span>
   */

  return (
    <div className="mt-6 flex flex-col gap-3">    
      <CheckboxRadix.Root 
        onCheckedChange={onCheckedChange}
        className="flex items-center gap-3 group"
      >        
        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
          <CheckboxRadix.Indicator>
            <Check size={20} className="text-white" />
          </CheckboxRadix.Indicator>
        </div>
        {contentLabel}
      </CheckboxRadix.Root>
    </div>
  )
}

export default Checkbox;