import React from 'react';

const Dashboard = React.lazy(() => import('./containers/Dashboard'));

const RestaurantRequest= React.lazy(() => import('./containers/RestaurantRequest'));
const OwnerRegistration= React.lazy(() => import('./containers/OwnerRegistration'));
const AddOffer=React.lazy(()=>import('./containers/AddOffer'))
const ViewOffer=React.lazy(()=>import('./containers/ViewOffer'))
const ViewRestaurantRequest=React.lazy(()=>import('./containers/ViewRestaurantRequest'));
const EditOffer=React.lazy(()=>import('./containers/EditOffer'));
const ViewProfile=React.lazy(()=>import('./containers/ViewProfile'));
const EditProfile=React.lazy(()=>import('./containers/EditProfile'));
const AddMenuItem=React.lazy(()=>import('./containers/AddMenuItem'));
const ViewMenuItems=React.lazy(()=>import('./containers/ViewMenuItem'));
const EditItem=React.lazy(()=>import('./containers/EditMenuItem'));
const ViewRatings=React.lazy(()=>import('./containers/ViewRatings'));
const ViewReservations=React.lazy(()=>import('./containers/ViewReservations'));
const ViewOrders=React.lazy(()=>import('./containers/ViewOrders'));
const ViewRestaurantImage=React.lazy(()=>import('./containers/ViewRestaurantImage'));
const ViewMenuImage=React.lazy(()=>import('./containers/ViewMenuImage'));
const EditRestaurant=React.lazy(()=>import('./containers/EditRestaurant'));










const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  {path:'/restaurant-request', exact:true,name:'Restaurant Request',component:RestaurantRequest},
  {path:'/login/add', exact:true,name:'Owner Registration',component:OwnerRegistration},
  {path:'/offers/add-offer',exact:true ,name:'Add Offer',component:AddOffer },
  {path:'/offers/view-offers',exact:true ,name:'View Offer',component:ViewOffer },
  {path:'/restaurantrequest',exact:true ,name:'View Restaurant Request',component:ViewRestaurantRequest },
  {path:'/edit/offer/:id',exact:true ,name:'Edit Offer',component:EditOffer },
  {path:'/view/profile',exact:true ,name:'View Profile',component:ViewProfile },
  {path:'/edit/profile',exact:true ,name:'Edit Profile',component:EditProfile },
  {path:'/items/additem',exact:true ,name:'Add MenuItem',component:AddMenuItem },
  {path:'/items/viewitems',exact:true ,name:'View MenuItem',component:ViewMenuItems },
  {path:'/edit/item/:id',exact:true ,name:'Edit Item',component:EditItem },
  {path:'/viewRatings',exact:true ,name:'View Ratings',component:ViewRatings },
  {path:'/viewReservations',exact:true ,name:'View Reservations',component:ViewReservations },
  {path:'/ViewOrders',exact:true ,name:'View Orders',component:ViewOrders },
  {path:'/restaurant/viewresimage/:id',exact:true ,name:'ViewRestaurantImage',component:ViewRestaurantImage },
  {path:'/restaurant/viewmenuimage/:id',exact:true ,name:'ViewMenuImage',component:ViewMenuImage },
  {path:'/edit/restaurant/:id',exact:true ,name:'EditRestaurant',component:EditRestaurant},


];

export default routes;
