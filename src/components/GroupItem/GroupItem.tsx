/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useMemo } from 'react';

import { GroupType, User } from '../../types';
import './style.css';

function GroupItem({ group }: { group: GroupType }) {
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);

  const handleFriendsClick = (friends: User[] | undefined) => {
    if (friends) {
      setSelectedFriends(selectedFriends.length ? [] : friends);
    }
  };

  // Функция для склонения слова в зависимости от числа
  const pluralizeWord = (number: number, word: string) => {
    if (number === 1) {
      return `${number} ${word}`;
    }

    if (number >= 2 && number <= 4) {
      return `${number} ${word}а`;
    }

    return `${number} ${word}ов`;
  };

  // Текст для количества друзей
  const friendsCountText = useMemo(() => pluralizeWord(group.friends?.length || 0, 'друг'), [group.friends?.length]);

  // Текст для количества подписчиков
  const membersCountText = useMemo(() => pluralizeWord(group.members_count, 'подписчик'), [group.members_count]);

  return (
    <div className="groups__group group" key={group.id}>
      <img
        className="group__image"
        src={`https://placehold.co/100x100/${group.avatar_color || '000000'}/FFFFFF?text=${group.name}&font=roboto`}
        alt={group.name}
      />

      <div>
        <h2 className="group__name">{group.name}</h2>
        <p>{group.closed ? 'Закрытая' : 'Открытая'} группа</p>
        <div className="group__statistic">
          {group.friends ? (
            <>
              <p className="group__friends-count" onClick={() => handleFriendsClick(group.friends)}>
                {friendsCountText}
              </p>
              ·
            </>
          ) : (
            ''
          )}

          <p> {membersCountText}</p>
        </div>

        {selectedFriends.length > 0 && (
          <ul className="group__friends">
            {selectedFriends.map((friend, index) => (
              // поскольку элементы массива остаются неизменными, и порядок элементов в массиве сохраняется,
              // то в таком случае использование индекса массива в качестве ключа является безопасным
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>{`${friend.first_name} ${friend.last_name}`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GroupItem;
