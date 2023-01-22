import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { NewHabitForm } from '../NewHabitForm';
import { IModal } from '../../intefaces';

export const Modal: React.FC<IModal> = ({open, onOpenChange, handleFeedbackAlert}) => {

  
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0"/>
        <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">          
          <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
            <X size={24} aria-label="Fechar" />
          </Dialog.Close>
          <Dialog.Title className="text-3xl leading-tight font-extrabold">
            Criar novo hábito
          </Dialog.Title>        
          <NewHabitForm  handleFeedbackAlert={handleFeedbackAlert}/>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
