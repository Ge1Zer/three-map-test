import React, {useEffect} from 'react'

import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {RouteWithAuth, AuthContainer} from './components/general/auth/export'

import Menu from './components/menu'

import Mapbox from './pages/mapbox';
import Leaflet from './pages/leaflet';
import OpenLayers from './pages/openLayers';
import {useActions} from "./hooks/useActions";
import MenuLayout from "./layout/MenuLayout";
import {useTypedSelector} from "./hooks/useTypedSelector";
import Holst from "./pages/holst";



function App() {

    let {auth} = useTypedSelector(state => state.authStore)
    const {
        FetchFullListFields,
        FetchUnits,
        connectFetchStatusUnits,
        disconnectFetchStatusUnits,
    } = useActions()



    useEffect(()=>{
        if(auth){
            FetchFullListFields()
            FetchUnits()

            connectFetchStatusUnits()
            return ()=>{
                disconnectFetchStatusUnits()
            }
        }

    },[auth])

  return (
    <>
        <Switch>
            <RouteWithAuth exact path={'/'}>
                <MenuLayout>
                    <div>нужно выбрать карту</div>
                </MenuLayout>
            </RouteWithAuth>
            <RouteWithAuth path={'/mapbox'} component={Mapbox} />
            <RouteWithAuth path={'/leaflet'} component={Leaflet} />
            <RouteWithAuth path={'/openlayers'} component={OpenLayers} />
            <RouteWithAuth path={'/holst'} component={Holst} />
            <Route path={'/log'} component={AuthContainer}/>
        </Switch>
    </>
  );
}

export default App;
