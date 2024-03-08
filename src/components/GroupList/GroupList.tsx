import { useState, useEffect } from 'react';
import { Group, User } from '../../types';
import './style.css';
import GroupItem from '../GroupItem/GroupItem';

function GroupList() {
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
    <div className="groups">
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </div>
  );
}

export default GroupList;
