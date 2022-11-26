import { useSetRecoilState } from 'recoil'
import { selectedPackIdByIdSelector } from './store/atom'
import { useEffect, useState } from 'react'

export const Component = () => {
  const [arr, setArr] = useState([])

  useEffect(() => {
    setArr(new Array(50).fill())
  }, [])

  return arr.map((x, idx) => {
    const id = Math.floor(Math.random() * 6)
    return <SubComponent key={idx} id={id} />
  })
}

const SubComponent = ({ id }) => {
  const setSelectedPack = useSetRecoilState(selectedPackIdByIdSelector(id))

  useEffect(() => {
    const packId = Math.floor(Math.random() * 600)
    setSelectedPack(packId)
  }, [])

  return <div>test - {id}</div>
}

export default Component
