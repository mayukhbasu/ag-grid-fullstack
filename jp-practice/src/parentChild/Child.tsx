import React from 'react'


type Props = {
  onLike: () => void
}
const Child: React.FC<Props> = ({onLike}) => {
  console.log("Child")
  return (
    <div>
      <button onClick={onLike}>Like</button>
    </div>
  )
}

export default React.memo(Child);