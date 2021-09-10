import 'antd/dist/antd.css';
import { RecoilRoot } from 'recoil';
import Home from './components/Home';

function App() {
  return (
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );
}

export default App;
