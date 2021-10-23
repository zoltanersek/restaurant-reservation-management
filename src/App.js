import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.component";
import PrivateRoute from "./components/private-route/private-route.component";
import HomePage from "./pages/home-page/home-page.component";
import LayoutEditorPage from "./pages/layout-editor/layout-editor.component";
import Reporting from "./pages/reporting/reporting.component";
import ReservationManagement from "./pages/reservation-management/reservation-management.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { selectCurrentUser } from "./redux/user/user.selectors";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  const restaurantName = currentUser ? currentUser.restaurantName : null;
  const redirectLocation = currentUser
    ? restaurantName
      ? ""
      : "/"
    : "/signin";
  const allow = currentUser && restaurantName;
  return (
    <div>
      <Header />
      <Switch>
        <PrivateRoute
          exact
          path="/"
          allow={currentUser}
          redirectLocation="/signin"
          component={HomePage}
        />
        <PrivateRoute
          allow={allow}
          redirectLocation={redirectLocation}
          path="/layout-editor"
          component={LayoutEditorPage}
        />
        <PrivateRoute
          allow={allow}
          redirectLocation={redirectLocation}
          path="/reservation-management"
          component={ReservationManagement}
        />
        <PrivateRoute
          allow={allow}
          redirectLocation={redirectLocation}
          path="/reporting"
          component={Reporting}
        />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
