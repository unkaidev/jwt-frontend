import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "../components/Login/Login"
import Register from "../components/Register/Register"
import Users from "../components/ManageUsers/Users"
import PrivateRoutes from './PrivateRoutes';
import Role from '../components/Role/Role';
import GroupRole from '../components/GroupRole/GroupRole';

const AppRoutes = (props) => {
    return (
        <>
            <Switch>

                <PrivateRoutes path="/users" component={Users} />
                {/* <PrivateRoutes path="/projects" component={Projects} /> */}
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/group-role" component={GroupRole} />


                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/" exact>
                    Home
                </Route>
                <Route path="*">
                    404 Not found
                </Route>
            </Switch>
        </>
    )

}
export default AppRoutes;