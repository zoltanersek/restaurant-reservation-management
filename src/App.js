import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import LayoutEditorPage from './pages/layout-editor/layout-editor.component';
import ReservationManagement from './pages/reservation-management/reservation-management.component';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <div>HomePage</div>} />
        <Route path="/layout-editor" component={LayoutEditorPage} />
        <Route path="/reservation-management" component={ReservationManagement} />
        <Route path="/reporting" render={() => <div>Reporting Page</div>} />
      </Switch>
    </div>
    
  );
}

export default App;
