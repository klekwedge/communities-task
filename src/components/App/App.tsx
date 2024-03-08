import { AppRoot, PanelHeader, SplitCol, SplitLayout } from '@vkontakte/vkui';
import GroupList from '../GroupList/GroupList';

function App() {
  const platform = 'vkcom';

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <PanelHeader>ВК сообщества</PanelHeader>
          <GroupList />
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}

export default App;
