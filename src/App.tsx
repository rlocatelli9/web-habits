
import './styles/global.css'
import './lib/dayjs'

import { Header } from './components/Header'
import { SumaryTable } from './components/SumaryTable'
import { useCallback, useState } from 'react'
import { Modal } from './components/Modal'
import { Alert } from './components/Alert'
import { IFeedback } from './intefaces'

export function App() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [feedback, setFeedback] = useState<IFeedback>({})


  const toggleModal = useCallback(() => {
    setIsOpenModal((oldState) => !oldState)
  },[setIsOpenModal])

  const toggleAlert = useCallback(({message, status}:IFeedback) => {
    if(isOpenAlert){
      setIsOpenAlert(false)
      setFeedback({})
    }

    if(message && status) {
      setIsOpenAlert(true)
      setFeedback({message, status})
    }
  },[isOpenAlert, setIsOpenAlert])




  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header toggleModal={toggleModal} />
        <SumaryTable />
        <Modal open={isOpenModal} onOpenChange={toggleModal} onOpenChangeAlert={toggleAlert}/>
        <Alert open={isOpenAlert} feedback={feedback} onOpenChange={toggleAlert}/>
      </div>
    </div>
  )
}
