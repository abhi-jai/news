import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import News from "./News";
import Blog from "./Blog";
class DefaultRouter extends React.Component {
  
  render() {
    const locationRequest = window.location.pathname
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Blog} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/:id" component={News} />
          </Switch>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({...state })


// export default connect(mapStateToProps)(DefaultRouter)
export default DefaultRouter