import { AppRoot, Button, PanelHeader } from '@vkontakte/vkui';
import GroupList from '../GroupList/GroupList';

function App() {
  const toggleTheme = () => {
    const element = document.querySelector('#root');

    if (element) {
      element.classList.toggle('vkui--vkBase--dark');
      element.classList.toggle('vkui--vkBase--light');
    }
  };

  return (
    <AppRoot mode="embedded">
      <PanelHeader>
        Команда сообществ
        <Button style={{ marginLeft: '20px' }} onClick={toggleTheme}>
          Сменить тему
        </Button>
      </PanelHeader>
      <GroupList />
    </AppRoot>
  );
}

export default App;
