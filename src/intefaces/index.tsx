
import { ReactElement } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Progress from '@radix-ui/react-progress';



export interface IFeedback {
  status?: 'SUCCESS' | 'ERROR'
  message?: string;
}

export interface IHeader {
  toggleModal():void;
}

export interface INewHabitForm {
  handleFeedbackAlert(feedback?:IFeedback):void;
}

export interface IHabitDay {
  completed?: number;
  amount?: number;
  date: Date;
}

export type ISummary = Array<{
  amount: number;
  completed: number;
  date: string;
  id: string;
}>

export interface IProgressBar extends Progress.ProgressProps{
  progress: number;
}

export interface IModal extends Dialog.DialogProps  {
  handleFeedbackAlert(feedback?:IFeedback): void;
}

export interface IAlert extends AlertDialog.AlertDialogProps {
  feedback: IFeedback
}

export type ICheckbox = Checkbox.CheckboxProps
