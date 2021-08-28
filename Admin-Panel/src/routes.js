import React from 'react';


const ViewCustomers= React.lazy(() => import('./containers/ViewCustomers'));
const ViewMembers=React.lazy(()=>import('./containers/ViewMembers'));
const ViewRestaurantRequests=React.lazy(()=>import('./containers/ViewRestaurantRequests'));
const ViewRestaurantImages=React.lazy(()=>import('./containers/ViewRestaurantImages'));
const ViewMenuImages=React.lazy(()=>import('./containers/ViewMenuImages'));
const ViewOwners=React.lazy(()=>import('./containers/ViewOwners'));
const AddMembership=React.lazy(()=>import('./containers/AddMembership'));
const ViewMembership=React.lazy(()=>import('./containers/ViewMembership.js'));
const EditMembership=React.lazy(()=>import('./containers/EditMembership'));
const ViewPayment=React.lazy(()=>import('./containers/ViewPayment'));





const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users/customers/ViewCustomers', exact:true,  name: 'ViewCustomers', component: ViewCustomers },
  { path: '/users/members', exact: true,  name: 'Members', component: ViewMembers },
  { path: '/users/members/ViewMembers',  name: 'ViewMembers', component: ViewMembers },
  {path:'/RestaurantRequests',exact:true,name:'ViewRestaurantRequests' , component:ViewRestaurantRequests},
  {path:'/RestaurantImages/:id',exact:true,name:'ViewRestaurantImages',component:ViewRestaurantImages},
  {path:'/MenuImages/:id',exact:true,name:'ViewMenuImages' , component:ViewMenuImages},
  {path:'/restaurant_owners/ViewOwners',name:'ViewOwners',component:ViewOwners},
  {path:'/AddMembership',exact: true, name:'AddMembership',component:AddMembership},
  {path:'/ViewMembership',exact: true, name:'ViewMembership',component:ViewMembership},
  { path: '/edit/membership/:id', exact: true, name: 'Edit Membership', component: EditMembership },
    {path:'/ViewPayment',name:'ViewPayment',component:ViewPayment},





];

export default routes;
