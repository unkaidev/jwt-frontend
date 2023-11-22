import { useContext } from "react";
import { useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContext";




const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);
    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        )
    } else {
        return <Redirect to='/login'></Redirect>
    }

}
export default PrivateRoutes;