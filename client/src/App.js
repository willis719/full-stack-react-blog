import './App.css';
import {
  NavLink,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions';
import { useEffect } from 'react';
import Blog from './pages/Blog';

function App() {

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const history = useHistory()

  const logout = () => {
    fetch('/api/v1/users/logout')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(data.success);
          dispatch(setUser(null));
          history.push('/login')
        }
      })
  };

  useEffect(() => {
    fetch('/api/v1/users/current')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          dispatch(setUser(data))
        }
      })
  }, [dispatch]);


  return (
    <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6" style={{ marginRight: 'auto' }}>
              Full Stack Blog
            </Typography>
            {
              user ? (
                <>
                  {user.username}
                  <Button onClick={logout} color="inherit">
                      Logout
                    </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={NavLink} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={NavLink} to="/register">
                    Register
                  </Button>
                </>
              )
            }
          </Toolbar>
        </AppBar>

        <Container style={{margin: '2em auto'}}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
          </Switch>
        </Container>
    </div>
  );
}
export default App;
