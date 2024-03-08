import { useState, useEffect } from 'react';
import { Card, CardGrid, CustomSelectOption, FormItem, Group, Panel, PanelHeader, Select, View } from '@vkontakte/vkui';

import { GroupType } from '../../types';
import './style.css';
import GroupItem from '../GroupItem/GroupItem';

const privacyValues = [
  { value: 'all', label: 'Все' },
  { value: 'closed', label: 'Закрытые' },
  { value: 'open', label: 'Открытые' },
];

function GroupList() {
  const [privacyFilter, setPrivacyFilter] = useState<string>('all');
  const [avatarColorFilter, setAvatarColorFilter] = useState<string>('any');
  const [avatarColors, setAvatarColors] = useState<string[]>(['any']);
  const [hasFriendsFilter, setHasFriendsFilter] = useState<boolean>(false);
  const [groups, setGroups] = useState<GroupType[]>([]);
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

        const newAvatarColors = [
          ...new Set(
            data.reduce((acc, current) => {
              if (current.avatar_color !== undefined) {
                acc.push(current.avatar_color);
              }
              return acc;
            }, []),
          ),
        ];

        setGroups(data);
        setAvatarColors([...avatarColors, ...newAvatarColors]);
      }, 1000);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const filterGroups = (): GroupType[] =>
    groups.filter((group) => {
      // Фильтрация по типу приватности
      if (privacyFilter === 'closed' && !group.closed) return false;
      if (privacyFilter === 'open' && group.closed) return false;

      // Фильтрация по цвету аватарки
      if (avatarColorFilter !== 'any' && group.avatar_color !== avatarColorFilter) return false;

      // Фильтрация по наличию друзей
      if (hasFriendsFilter && (!group.friends || group.friends.length === 0)) return false;

      return true;
    });

  useEffect(() => {
    fetchData();
  }, []);

  const filteredGroups = filterGroups();

  return (
    <div className="container">
      <Group className="filters">
        <FormItem htmlFor="select-id" top="Приватность" className="filters__item">
          <Select
            id="privacy"
            placeholder="Не выбрана"
            options={privacyValues}
            onChange={(e) => setPrivacyFilter(e.target.value)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderOption={({ option, ...restProps }) => <CustomSelectOption {...restProps} key={option.value} />}
          />
        </FormItem>
        <FormItem htmlFor="select-id" top="Цвет обложки" className="filters__item">
          <Select
            id="privacy"
            placeholder="Не выбрана"
            options={avatarColors.map((color) => ({
              label: color[0].toUpperCase() + color.slice(1),
              value: color,
              avatar: color,
            }))}
            onChange={(e) => setAvatarColorFilter(e.target.value)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderOption={({ option, ...restProps }) => <CustomSelectOption {...restProps} key={option.value} />}
          />
        </FormItem>
        {/* <FormItem htmlFor="select-id" top="Цвет обложки" className="filters__item">
          <Select
            id="privacy"
            placeholder="Не выбрана"
            options={avatarColors.map((color) => ({
              label: color[0].toUpperCase() + color.slice(1),
              value: color,
              avatar: color,
            }))}
            onChange={(e) => setAvatarColorFilter(e.target.value)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderOption={({ option, ...restProps }) => <CustomSelectOption {...restProps} key={option.value} />}
          />
        </FormItem> */}
      </Group>

      <div>
        {/* <label>
          Цвет обложки:
          <select value={avatarColorFilter} onChange={(e) => setAvatarColorFilter(e.target.value)}>
            {avatarColors.map((color) => (
              <option value={color} key={color}>
                {color[0].toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
        </label> */}
        <label>
          Есть друзья:
          <input type="checkbox" checked={hasFriendsFilter} onChange={(e) => setHasFriendsFilter(e.target.checked)} />
        </label>
      </div>
      <div className="groups">
        {filteredGroups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

export default GroupList;
