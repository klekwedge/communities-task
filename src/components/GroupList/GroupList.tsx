import { useState, useEffect } from 'react';
import { CustomSelectOption, FormItem, Group, Select, Spinner } from '@vkontakte/vkui';

import { GroupType, Loading } from '../../types';
import './style.css';
import GroupItem from '../GroupItem/GroupItem';
import GroupService from '../../services/GroupService';

const privacyValues = [
  { value: 'all', label: 'Все' },
  { value: 'closed', label: 'Закрытые' },
  { value: 'open', label: 'Открытые' },
];

const friendValues = [{ value: 'yes', label: 'Да' }];

function GroupList() {
  const [privacyFilter, setPrivacyFilter] = useState<string>('all');
  const [avatarColorFilter, setAvatarColorFilter] = useState<string>('any');
  const [avatarColors, setAvatarColors] = useState<string[]>(['any']);
  const [hasFriendsFilter, setHasFriendsFilter] = useState<boolean>(false);

  const [groups, setGroups] = useState<GroupType[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<Loading>('loading');

  const fetchData = async () => {
    GroupService.getGroups()
      .then((data) => {
        const newAvatarColors = [
          ...new Set(
            data.reduce((acc: string[], current) => {
              if (current.avatar_color !== undefined) {
                acc.push(current.avatar_color);
              }
              return acc;
            }, []),
          ),
        ];

        setGroups(data);
        setAvatarColors([...avatarColors, ...newAvatarColors]);
        setLoadingStatus('idle');
      })
      .catch(() => setLoadingStatus('error'));
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
      {/* Отображаем спиннер при загрузке */}
      {loadingStatus === 'loading' && <Spinner size="large" style={{ margin: '20px 0' }} />}

      {/* Отображаем фильтры и сообщества, если статус загрузки равен idle */}
      {loadingStatus === 'idle' && (
        <>
          {/* Отображаем фильтры */}
          <Group className="filters">
            <FormItem htmlFor="select-id" top="Приватность" className="filters__item">
              <Select
                defaultValue="all"
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
                id="colors"
                placeholder="Не выбран"
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
            <FormItem htmlFor="select-id" top="Есть друзья" className="filters__item">
              <Select
                id="friends"
                placeholder="Не выбрано"
                options={friendValues}
                onChange={(e) => setHasFriendsFilter(e.target.value === 'yes')}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderOption={({ option, ...restProps }) => <CustomSelectOption {...restProps} key={option.value} />}
              />
            </FormItem>
          </Group>

          {/* Отображаем список сообществ */}
          <div className="groups">
            {filteredGroups.map((group) => (
              <GroupItem key={group.id} group={group} />
            ))}
          </div>

          {/* Отображаем сообщение об отсутствии сообществ с учетом выбранных фильтров */}
          {!filteredGroups.length && (
            <h2 className="groups__title">
              Сообщества не найдены. По вашим критериям поиска нет результатов. Попробуйте изменить фильтры или
              расширить критерии поиска.
            </h2>
          )}
        </>
      )}
    </div>
  );
}

export default GroupList;
