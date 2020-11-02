import React from "react";
import "./App.scss";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/profile/Profile";
import Admin from "./components/Admin/Admin";
import { Container } from "bloomer";
import Artists from "./components/Artists";
import Album from "./components/Album";
import NoMatch from "./components/NoMatch";
import EditProfile from "./components/profile/EditProfile";
import Favourite from "./components/Favourite";
import Search from "./components/Search";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/editProfile" component={EditProfile} />
          {/* Private Route */}
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/artists" component={Artists} />
          <PrivateRoute path="/albums" component={Album} />
          {/* Admin */}

          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/favourite" component={Favourite} />
          <PrivateRoute path="/search" component={Search} />

          {/* <PrivateRoute path="/song" component={SongAdmin} />
          <PrivateRoute path="/album" component={AlbumAdmin} />
          <PrivateRoute path="/user" component={UserAdmin} />
          <PrivateRoute path="/artist" component={ArtistAdmin} /> */}
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
