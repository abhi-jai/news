import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Account from "./account";
import Login from "./login";
import Main from "./Main";
import Blog from "./Blog";
class DefaultRouter extends React.Component {
  
  render() {
    const locationRequest = window.location.pathname
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Blog} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/blog" component={Blog} />
          </Switch>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({...state })


// export default connect(mapStateToProps)(DefaultRouter)
export default DefaultRouter