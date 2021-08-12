import './App.css';
import Header from './Header';
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgets from './Widgets';
import Login from './Login';
import { useStateValue } from './StateProvider';
function App() {
  const [{user}, ] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <>
          <Header />
          <div className="app_body">
            { /* App Body */}
            <Sidebar />
            {/* Feed */}
            <Feed />
            {/* Widgets */}
            <Widgets />
          </div>
        </>
      )}
    </div>
  );
}

export default App;