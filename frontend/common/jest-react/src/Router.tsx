import {Route, Routes} from "react-router-dom";
import Users from "./Users";
import NotFound from "./NotFound";
import React from "react";

const AppRouter = () => {
    return    <Routes>
        <Route path={'/users'} element={<Users/>}/>
        <Route path={'/not_found'} element={<NotFound/>}/>
    </Routes>
}


export default AppRouter
