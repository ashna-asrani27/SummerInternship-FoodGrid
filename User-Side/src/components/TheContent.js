import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
// routes config
import routes from '../routes'



const TheContent = () => {
  return (
    <main className="c-main">
    
        <Suspense>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
              
                      <route.component {...props} />
                    
                  )} />
              )
            })}
            <Redirect from="/" to="/restaurant" />
            {/* <Membershipmenu/> */}
          </Switch>
        </Suspense>
          {/* <Membershipmenu/>
          <Category/> */}

    </main>
      // <div>
      //   <Carouselhome/>
      // <Membershipmenu/>
      // <Category/>
      // </div>
    
  )
}

export default React.memo(TheContent)
