
export interface IFeedback {
  status?: 'SUCCESS' | 'ERROR'
  message?: string;
}

export interface IHeaderProps {
  toggleModal():void;
}

export interface IModalProps {
  open: boolean;
  onOpenChange(): void;
  onOpenChangeAlert(): void;
}

export interface INewHabitForm {
  onOpenChangeAlert(feedback?:IFeedback):void;
}

export interface IAlert {
  open: boolean;
  feedback: IFeedback
  onOpenChange(): void
}