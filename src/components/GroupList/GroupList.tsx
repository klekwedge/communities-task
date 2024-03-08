import { useState, useEffect } from 'react';
import { Group, User } from '../../types';
import './style.css';

function GroupList() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [error, setError] = useState(null);

  const handleFriendsClick = (friends: User[]) => {
    setSelectedFriends(friends);
  };

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

  console.log(groups);

  return (
    <div className="groups">
      {groups.map((group) => (
        <div className="groups__group group" key={group.id}>
          <img
            className="group__image"
            src={`https://via.placeholder.com/100/${group.avatar_color || '000000'}/FFFFFF/?text=${group.name}`}
            alt={group.name}
          />
          <div>
            <h2 className="group__name">{group.name}</h2>
            <p>Публичность: {group.closed ? 'Закрытая' : 'Открытая'}</p>
            <p>Подписчики: {group.members_count}</p>
            {group.friends ? (
              <p className='group__friends-count' onClick={() => handleFriendsClick(group.friends)}>Друзья: {group.friends.length}</p>
            ) : (
              ''
            )}

            {selectedFriends.length > 0 && (
              <div className='group__friends'>
                <ul>
                  {selectedFriends.map((friend, index) => (
                    <li key={index}>{`${friend.first_name} ${friend.last_name}`}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupList;
