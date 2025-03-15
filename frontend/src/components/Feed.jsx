// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { BASE_URL } from '../utils/constants'
// import { useDispatch, useSelector } from 'react-redux'
// import { addFeed } from '../utils/feedSlice'
// import UserCard from './UserCard'

// const Feed = () => {
//     const dispatch = useDispatch();
//     const feed = useSelector((store) => store.feed);
//     const user = useSelector((store) => store.user); // Get user slice from Redux
//     const [index, setIndex] = useState(0);


//    const getFeed = async()=>{
//       // if(feed) return ;
//       console.log("getFeed() called feed= ",feed);

//       try{
//         const res = await axios.get(BASE_URL + "/feed" , {withCredentials : true});
//         // console.log(res);

//         console.log(res.data.data);
//         console.log("dispatch is getting callsed addFeed")
//         dispatch(addFeed(res?.data?.data));
//       }
//       catch(err){
//         console.log(err);
//       }
//    }

//    useEffect(()=>{
//     getFeed();
//    }, [user])

   
//    if(!feed) return ;
//    if(feed.length === 0) return  <div> No more new User Left</div>

//   return (
//     <div className='flex justify-center my-auto items-center mt-10'>
//       <UserCard user={feed[index]}  setIndex ={setIndex }/>
//     </div>
//   )
// }

// export default Feed






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';
// import { useDispatch, useSelector } from 'react-redux';
// import { addFeed } from '../utils/feedSlice';
// import UserCard from './UserCard';
// import { useSwipeable } from 'react-swipeable';
// import './Feed.css';

// const Feed = () => {
//   const dispatch = useDispatch();
//   const feed = useSelector((store) => store.feed);
//   const user = useSelector((store) => store.user);
//   const [index, setIndex] = useState(0);

//   const getFeed = async () => {
//     try {
//       const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
//       dispatch(addFeed(res?.data?.data));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, [user]);

//   const handlers = useSwipeable({
//     onSwipedLeft: () => nextUser(),
//     onSwipedRight: () => prevUser(),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const nextUser = () => {
//     setIndex((prev) => (prev === feed.length - 1 ? 0 : prev + 1));
//   };

//   const prevUser = () => {
//     setIndex((prev) => (prev === 0 ? feed.length - 1 : prev - 1));
//   };

//   if (!feed || feed.length === 0) return <div>No more new users left</div>;

//   return (
//     <div className=" mt-12 feed-container" {...handlers}>
//       {/* Previous 3 cards */}
//       {feed.slice(index - 2, index).map((user, i) => (
//         <div
//           key={user._id}
//           className="user-card-wrapper prev-card"
//           style={{ left: `${(i - 3) * 20}%` }}
//         >
//           <UserCard user={user} />
//         </div>
//       ))}

//       {/* Current card */}
//       <div className="user-card-wrapper active-card">
//         <UserCard user={feed[index]} setIndex={setIndex} />
//       </div>

//       {/* Next 3 cards */}
//       {feed.slice(index + 1, index+3).map((user, i) => (
//         <div
//           key={user._id}
//           className="user-card-wrapper next-card"
//           style={{ right: `${(i - 3) * 20}%` }}
//         >
//           <UserCard user={user} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Feed;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import { useSwipeable } from 'react-swipeable';
import './Feed.css';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const [index, setIndex] = useState(0);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, [user]);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextUser(),
    onSwipedRight: () => prevUser(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const nextUser = () => {
    setIndex((prev) => (prev === feed.length - 1 ? 0 : prev + 1));
  };

  const prevUser = () => {
    setIndex((prev) => (prev === 0 ? feed.length - 1 : prev - 1));
  };

  if (!feed || feed.length === 0) return <div>No more new users left</div>;

  return (
    <div className="feed-container" {...handlers}>
      {/* Previous 3 cards */}
      {feed.slice(index - 2, index).map((user, i) => (
        <div
          key={user._id}
          className="user-card-wrapper prev-card"
          style={{ left: `${(i - 3) * 20}%` }}
        >
          <UserCard user={user} />
        </div>
      ))}

      {/* Current card */}
      <div className="user-card-wrapper active-card">
        <UserCard user={feed[index]} setIndex={setIndex} />
      </div>

      {/* Next 3 cards */}
      {feed.slice(index + 1, index + 3).map((user, i) => (
        <div
          key={user._id}
          className="user-card-wrapper next-card"
          style={{ right: `${(i - 3) * 20}%` }}
        >
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
};

export default Feed;