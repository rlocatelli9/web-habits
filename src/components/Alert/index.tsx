import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { IAlert } from '../../intefaces';

export const Alert: React.FC<IAlert> = ({open, feedback, onOpenChange}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange} >
      <AlertDialog.Trigger />
      <AlertDialog.Portal > 
        <AlertDialog.Overlay className="w-screen h-screen bg-black/50 fixed inset-0"/>
        <AlertDialog.Content className="absolute p-10 bg-violet-900 rounded-2xl w-full max-w-md top-32 left-1/2 -translate-x-1/2 -translate-y-1/2">          
          <AlertDialog.Title className="text-3xl leading-tight font-extrabold">
            {feedback.status === 'ERROR' ? 'Atenção!' : 'Parabéns!' }
          </AlertDialog.Title>    
          <AlertDialog.Description>
            {feedback.message}
          </AlertDialog.Description> 
          <div className='flex items-center justify-end'>          
          <AlertDialog.Action className="ml-6 mt-6 rounded-lg p-2 flex items-center justify-center gap-3 font-semibol bg-green-600 hover:bg-green-500">            
            Entendi
          </AlertDialog.Action>
          </div>   

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
