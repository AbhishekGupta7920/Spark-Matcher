import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const sizes = {
  active:
    'w-[300px] sm:w-[320px] md:w-[340px] lg:w-[360px] xl:w-[380px] ' +
    'h-[560px] md:h-[600px] lg:h-[640px] xl:h-[660px]',
  near:
    'w-[280px] lg:w-[300px] xl:w-[320px] ' +
    'h-[500px] lg:h-[540px] xl:h-[560px]',
  far: 'w-[260px] lg:w-[280px] h-[440px] lg:h-[470px]',
};

const imageHeights = {
  active: 'h-[58%]',
  near: 'h-[56%]',
  far: 'h-[54%]',
};

const UserCard = ({ user, setIndex, variant = 'active', showActions = false, onPrev, onNext }) => {
  if (!user) return null;
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills, sendFromEditProfile } = user;

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {}
  };

  const nextUser = () => {
    if (onNext) return onNext();
    setIndex && setIndex((p) => (p === feed.length - 1 ? 0 : p + 1));
  };
  const prevUser = () => {
    if (onPrev) return onPrev();
    setIndex && setIndex((p) => (p === 0 ? feed.length - 1 : p - 1));
  };

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl border border-gray-700 bg-gray-900 text-white shadow-2xl ${sizes[variant]}`}
      style={{
        boxShadow:
          variant === 'active'
            ? '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px -10px rgba(236, 72, 153, 0.4)'
            : '0 10px 25px -5px rgba(0,0,0,0.4)',
      }}
    >
      <div className={`relative w-full overflow-hidden ${imageHeights[variant]}`}>
        <img
          src={photoUrl}
          alt={firstName}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.9), transparent)' }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
            {firstName + ' ' + (lastName || '')}
          </h2>
          {age && (
            <span className="shrink-0 rounded-full bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300">
              {age}
            </span>
          )}
        </div>

        {gender && (
          <span className="w-fit rounded-full border border-gray-700 bg-gray-800/50 px-2.5 py-0.5 text-xs capitalize text-gray-400">
            {gender}
          </span>
        )}

        <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">{about}</p>

        {sendFromEditProfile && (skills.length > 0) && (
          <p className="text-sm">
            <span className="text-purple-400">Skills: </span>
            <span className="text-gray-300">{skills?.length ? skills.join(', ') : ''}</span>
          </p>
        )}

        {showActions && !sendFromEditProfile && (
          <div className="mt-auto grid grid-cols-2 gap-4 pt-3 lg:grid-cols-2">
            {/* <button
              className="hidden rounded-xl bg-gray-700 px-2 py-2 text-xs font-medium text-white transition hover:brightness-110 sm:text-sm lg:block"
              onClick={prevUser}
            >
              Prev
            </button> */}
            <button
              className="rounded-xl bg-rose-600 px-2 py-2 text-xs font-semibold text-white transition hover:brightness-110 sm:text-sm"
              onClick={() => handleSendRequest('ignored', _id)}
            >
              Ignore
            </button>
            <button
              className="rounded-xl px-2 py-2 text-xs font-semibold text-white transition hover:brightness-110 sm:text-sm"
              style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}
              onClick={() => handleSendRequest('interested', _id)}
            >
              Interested
            </button>
            {/* <button
              className="hidden rounded-xl bg-gray-700 px-2 py-2 text-xs font-medium text-white transition hover:brightness-110 sm:text-sm lg:block"
              onClick={nextUser}
            >
              Next
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;