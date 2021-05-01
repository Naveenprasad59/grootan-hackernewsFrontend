import './App.css';
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import News from "./components/news";
import SingleComment from "./components/SingleComment";
import Jobs from "./components/Jobs";
import Show from "./components/Show";
import Login from "./components/Login";
import {UserProvider} from "./context/statecontext";
function App() {
  return (
    <UserProvider>
    <Router>
    <Switch>
    <div className="App">
    <Route path="/login" component={Login} />
    <Route path="/show" component={Show}/>
    <Route path="/jobs" component={Jobs}/>
    <Route path="/comments/:id" component={SingleComment} />
    <Route path="/news" exact component={News} />
    <Route path="/news/:id" exact component={News} />
    <Route path="/" exact component={Home} />
    </div>
    </Switch>
    </Router>
    </UserProvider>
  );
}

export default App;
