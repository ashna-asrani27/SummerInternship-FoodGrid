

import React from 'react';



const Dashboard = React.lazy(() => import('./components/main'));
const Restaurant = React.lazy(() => import('./components/Restaurant'));
const ViewRestaurant = React.lazy(() => import('./components/ViewRestaurant'));
const Restaurantmap = React.lazy(() => import('./components/RestaurantMap'));
const Membership = React.lazy(() => import('./components/Membership'));
const EditProfile = React.lazy(() => import('./components/EditProfile'));
const ViewProfile = React.lazy(() => import('./components/ViewProfile'));
const MembershipSuccessfull = React.lazy(() => import('./components/SuccessfullMembership'));
const AddToCart = React.lazy(() => import('./components/AddToCart'));
const Checkout = React.lazy(() => import('./components/Checkout'));
const Order = React.lazy(() => import('./components/Order'));
// const ViewMenuImage=React.lazy(()=>import('./containers/ViewMenuImage'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/restaurant', name: 'Dashboard', component: Dashboard },
  { path: '/restaurantall', name: 'Restaurant', component: Restaurant },
  { path: '/restaurants/:id', name: 'View Restaurant', component: ViewRestaurant },
  { path: '/RestaurantMap/:id', name: 'View Restaurant', component: Restaurantmap },
  { path: '/membership', name: 'View Membership', component: Membership },
  { path: '/EditProfile/:id', name: 'Edit Profile', component: EditProfile },
  { path: '/viewprofile', name: 'View Profile', component: ViewProfile },
  { path: '/viewmembership', name: 'Membership Successfull', component: MembershipSuccessfull  },
  { path: '/addtocart', name: 'AddToCart', component: AddToCart},
  { path: '/checkout/:id', name: 'Checkout', component: Checkout  },
  { path: '/order', name: 'Order', component: Order  },



//   {path:'/restaurant/viewmenuimage/:id',exact:true ,name:'View Menu Image',component:ViewMenuImage },


];

export default routes;
