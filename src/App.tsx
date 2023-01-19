
import './styles/global.css'

import { Header } from './components/Header'
import { SumaryTable } from './components/SumaryTable'
import { useCallback, useState } from 'react'
import { Modal } from './components/Modal'



export function App() {

  const [isOpenModal, setIsOpenModal] = useState(false)

  const toggleModal = useCallback(() => {
    setIsOpenModal((oldState) => !oldState)
  },[setIsOpenModal])


  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header toggleModal={toggleModal} />
        <SumaryTable />
        <Modal open={isOpenModal} onOpenChange={toggleModal}/>
      </div>
    </div>
  )
}
