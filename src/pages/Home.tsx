
import '../styles/global.css'
import '../lib/dayjs'

import { useCallback, useEffect, useState } from 'react'

import { Header } from '../components/Header'
import { SumaryTable } from '../components/SumaryTable'
import { Modal } from '../components/Modal'
import { Alert } from '../components/Alert'
import { IFeedback } from '../interfaces'

export function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [feedback, setFeedback] = useState<IFeedback>({})


  useEffect(() => {
    if(!isOpenAlert) setFeedback({})
  },[isOpenAlert])


  const toggleModal = useCallback(() => {
    setIsOpenModal((oldState) => !oldState)
  },[setIsOpenModal])

  const toggleAlert = useCallback(() => {
    setIsOpenAlert((oldState) => !oldState)
  },[setIsOpenAlert])

  const handleFeedbackAlert = useCallback(({message, status}:IFeedback) => {    
    if(message && status) {
      setFeedback({message, status})
    }      
    toggleAlert()
  },[setFeedback])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header toggleModal={toggleModal} />
        <SumaryTable />
        <Modal open={isOpenModal} onOpenChange={toggleModal} handleFeedbackAlert={handleFeedbackAlert}/>
        <Alert open={isOpenAlert} feedback={feedback} onOpenChange={toggleAlert}/>
      </div>
    </div>
  )
}
