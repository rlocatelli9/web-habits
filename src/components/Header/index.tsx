import React from 'react';
import {Plus} from 'phosphor-react'

import logo from '../../assets/logo.svg'
import { IHeader } from '../../interfaces';

export const Header: React.FC<IHeader> = ({toggleModal}) => {  

  const handleButtonClick = () => {
    toggleModal()
  }

  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logo} alt="Habits" />
      <button 
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
        onClick={handleButtonClick}
      >
        <Plus size={20} className="text-violet-500"/>
        Novo hábito
      </button>
    </header>
  )
}