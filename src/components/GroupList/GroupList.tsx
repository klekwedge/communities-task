import { useState, useEffect } from 'react';
import { Group, User } from '../../types';

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
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(groups);

  return (
    <div>
      {groups.map((group) => (
        <div key={group.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <h2>{group.name}</h2>
          <img
            src={`https://via.placeholder.com/100/${group.avatar_color || '000000'}/FFFFFF/?text=${group.name}`}
            alt={group.name}
            style={{ width: '100px', height: '100px' }}
          />
          <p>Публичность: {group.closed ? 'Closed' : 'Open'}</p>
          <p>Подписчики: {group.members_count}</p>
          <p>
            Друзья:{' '}
            {group.friends ? (
              <button onClick={() => handleFriendsClick(group.friends)}>{group.friends.length}</button>
            ) : (
              'None'
            )}
          </p>
          {selectedFriends.length > 0 && (
            <div>
              <h3>Друзья:</h3>
              <ul>
                {selectedFriends.map((friend, index) => (
                  <li key={index}>{`${friend.first_name} ${friend.last_name}`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GroupList;
