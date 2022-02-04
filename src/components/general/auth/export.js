import AuthContainer from './AuthContainer'
import RouteWithAuth from './hoc/RouteWithAuth'
import SuperRouter from './hoc/SuperRouter'
import {DoLogOut} from './store/dispath'
import token from './util/getToken'
import company from './util/getCompanyId'
import authStore from "../auth/store/store";


// authStore --название сторе которое записывается в redusers
// для выхода использовать метод logOut()
export {
    authStore,
    AuthContainer,
    //  switch для контейнера логина -
    //  вставлять ко всем Routers в виде
    //  <Route path={'/log'}>
    //     <AuthContainer />
    //  </Route>

    SuperRouter,
    // hoc для проверки пути на доступность пользователя

    RouteWithAuth,
    //кастомный Route
    //  <RouteWithAuth path='/harmful'>
    //     <HarmfulContainer showErrors={showErrors}/>
    //  </RouteWithAuth>
    company,
    token,
    //  функция получения свежего токена из localStorage
    //  подмешивается в api в headers
    DoLogOut
};
