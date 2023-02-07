
import { InputHTMLAttributes } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Progress from '@radix-ui/react-progress';
import { IconProps } from 'phosphor-react';



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
  defaultCompleted?: number;
  amount?: number;
  date: Date;
}

export type ISummary = Array<{
  amount: number;
  completed: number;
  date: string;
  id: string;
}>

export interface IHabitsList {
  date: Date;
  onCompletedChange(completedTotal: number): void;
}

export interface IPossibleHabitsList {
  created_at: string;
  id: string;
  title: string;
}

export interface IHabitsInfo {
  completedHabits:  Array<string>
  possibleHabits: Array<IPossibleHabitsList> 
}

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

export interface IUser {
  email: string;
  password: string;
  name?: string;
}

export interface IAuthContext {
  user?: IUser;
  signin: (user: IUser, callback: VoidFunction) => void;
  signup: (user: IUser, callback: VoidFunction) => any;
  signout: (callback: VoidFunction) => void;
}

export interface IPassword {
  passwordShown: boolean;
  togglePassword: () => void;
}

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconProps>;
  passwordState?: IPassword;
  error?: string;
}

export interface IEventFormLogin {
  email: { value: string };
  password: { value: string };
}

export interface IEventFormSignUp {
  name: {value: string};
  email: { value: string };
  password: { value: string };
}

export interface IInputError {
  email?:string;
  password?:string;
  confirmPassword?:string;
}