import { useState, useEffect } from 'react';
import { Group } from '../../types';

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
        if (data.result === 0 || !data.data) {
          throw new Error('Error fetching groups: result 0 or no data field');
        }
        setGroups(data.data);
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
      <h1>Groups</h1>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
