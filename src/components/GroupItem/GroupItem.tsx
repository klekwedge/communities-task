import { useState, useEffect } from 'react';
import { Group, User } from '../../types';
import './style.css';

function GroupItem({ group }: { group: Group }) {
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [error, setError] = useState(null);

  const handleFriendsClick = (friends: User[]) => {
    setSelectedFriends(selectedFriends.length ? [] : friends);
  };

  return (
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
          <p className="group__friends-count" onClick={() => handleFriendsClick(group.friends)}>
            Друзья: {group.friends.length}
          </p>
        ) : (
          ''
        )}

        {selectedFriends.length > 0 && (
          <div className="group__friends">
            <ul>
              {selectedFriends.map((friend, index) => (
                <li key={index}>{`${friend.first_name} ${friend.last_name}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupItem;
