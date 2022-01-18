import React, {useEffect} from 'react';
import TripDashboard from "../../features/trips/dashboard/TripDashboard";
import {observer} from "mobx-react-lite";
import {Routes, Route, useLocation} from "react-router-dom"
import HomePage from "../../features/pages/HomePage";
import TripForm from "../../features/trips/form/TripForm";
import TripDetails from "../../features/trips/details/TripDetails";
import Layout from "../layout/Layout";
import {ToastContainer} from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import LoginForm from "../../features/users/LoginForm";
import useStore from "../stores/store";
import LoadingComponent from "../layout/LoadingComponent";

function App() {
    const location = useLocation();
    const {commonStore, userStore} = useStore();
    useEffect(() => {
        if(commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded()
        }
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded) {
        return <LoadingComponent content={'Loading app...'} />
    }
    
  return (
    <div className="App"> 
        <ToastContainer position={'bottom-right'} hideProgressBar />
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route element={<Layout/>}>
                <Route path="/trips" element={<TripDashboard/>} />
                <Route path="/trips/:id" element={<TripDetails/>} />
                <Route path="/login" element={<LoginForm/>} />
                {/* @todo */}
                {/* Fix problem with creating new trip while editing old */}
                <Route key={location.key} path="/createTrip" element={<TripForm/>} />
                <Route key={location.key} path="/editTrip/:id" element={<TripForm/>} />
                <Route path={'*'} element={<NotFound/>} />
            </Route>
        </Routes>
    </div>
  );
}

export default observer(App);
