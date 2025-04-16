import React, { useCallback, useMemo, useState } from 'react'
import Child from './Child'

const Parent = () => {

  const [likes, setLikes] = useState(0);
  const [other, setOther] = useState(false);
  const likeCount = useCallback(() => {
    console.log("This is triggered");
    setLikes((prev) => prev + 1);
  }, []);

  const squaredLikes = useMemo(() => {
    console.log('🧮 Calculating squaredLikes...');
    return likes * likes;
  }, [likes]);
  // const squaredLikes = likes * likes;
  // console.log("squaredLikes calcilated  ", squaredLikes);
  
  console.log(other)
  return (
    <div style={{ margin: '100px' }}>
    <Child onLike={likeCount} />
    <p>Total Likes: {likes}</p>
    <p>Squared Likes (memoized): {squaredLikes}</p>

    <button onClick={() => setOther(!other)}>Change Other</button>
  </div>
  )
}

export default Parent