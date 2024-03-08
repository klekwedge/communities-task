import { useState, useEffect } from 'react';
import { Group, User } from '../../types';
import './style.css';
import GroupItem from '../GroupItem/GroupItem';

function GroupList() {
  const [privacyFilter, setPrivacyFilter] = useState<string>('all');
  const [avatarColorFilter, setAvatarColorFilter] = useState<string>('any');
  const [hasFriendsFilter, setHasFriendsFilter] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/groups.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Имитация задержки в 1 секунду
      setTimeout(() => {
        // if (data.result === 0 || !data.data) {
        //   throw new Error('Error fetching groups: result 0 or no data field');
        // }
        setGroups(data);

      }, 1000);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container'>
      <div>
        <label>
          Приватность:
          <select value={privacyFilter} onChange={(e) => setPrivacyFilter(e.target.value)}>
            <option value="all">Все</option>
            <option value="closed">Закрытые</option>
            <option value="open">Открытые</option>
          </select>
        </label>
        <label>
          Цвет обложки:
          <select value={avatarColorFilter} onChange={(e) => setAvatarColorFilter(e.target.value)}>
            <option value="any">Any</option>
          </select>
        </label>
        <label>
          Есть друзья:
          <input type="checkbox" checked={hasFriendsFilter} onChange={(e) => setHasFriendsFilter(e.target.checked)} />
        </label>
      </div>
      <div className="groups">
        {groups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>{' '}
    </div>
  );
}

export default GroupList;
