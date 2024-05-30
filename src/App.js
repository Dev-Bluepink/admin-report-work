/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Report from "./pages/Report";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import GetReports from "./pages/GetReports";
import Main from "./components/layout/Main";
import ProtectedRoute from "./ProtectedRoute";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import CreateUpdate from "./pages/CreateUpdate";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <ProtectedRoute exact path="/dashboard" component={Home} />
          <ProtectedRoute exact path="/tables" component={Tables} />
          <ProtectedRoute exact path="/billing" component={Billing} />
          <ProtectedRoute exact path="/report" component={Report} />
          <ProtectedRoute exact path="/get-reports" component={GetReports} />
          <ProtectedRoute exact path="/rtl" component={Rtl} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/create-account"
            component={CreateUpdate}
          />
          {/* <Redirect from="*" to="/dashboard" /> */}
        </Main>
      </Switch>
    </div>
  );
}

export default App;
