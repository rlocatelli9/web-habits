import React from 'react';
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react';
import { ICheckbox } from '../../intefaces';

const Checkbox: React.FC<ICheckbox> = ({children, checked, onCheckedChange}) => {
  if(!children) return null

  return (
    <div className="mt-6 flex flex-col gap-3">    
      <CheckboxRadix.Root 
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="flex items-center gap-3 group"
      >        
        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
          <CheckboxRadix.Indicator>
            <Check size={20} className="text-white" />
          </CheckboxRadix.Indicator>
        </div>
        {children}
      </CheckboxRadix.Root>
    </div>
  )
}

export default Checkbox;