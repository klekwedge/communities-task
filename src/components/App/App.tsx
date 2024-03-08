import { AppRoot, PanelHeader, SplitCol, SplitLayout } from '@vkontakte/vkui';
import GroupList from '../GroupList/GroupList';

function App() {
  return (
    <AppRoot>
      <PanelHeader>ВК сообщества</PanelHeader>
      <GroupList />
    </AppRoot>
  );
}

export default App;
