import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },

  {
    _tag:'CSidebarNavDropdown',
    name:'Manage Users',
    route:'/users',
    // route:'/base',
    icon:'cil-cursor',
    _children:[
      {
        _tag:'CSidebarNavDropdown',
        name:'Customers',
        route:'/users/customers',
        // route:'/base',
        icon:'cil-cursor',
        _children:[
          {
            _tag:'CSidebarNavItem',
            name:'View Customers',
            to:'/users/customers/ViewCustomers'
            // to:'/base/tables'
          }
        ],
        
      },
  
      {
        _tag:'CSidebarNavDropdown',
        name:'Members',
        route:'/users/members',
        icon:'cil-cursor',
        _children:[
          {
            _tag:'CSidebarNavItem',
            name:'View Members',
            to:'/users/members/ViewMembers'
          }
          
        ],
      },
      {
        _tag:'CSidebarNavDropdown',
        name:'Restaurant Owners',
        route:'/users/restaurant_owners',
        icon:'cil-cursor',
        _children:[
          {
            _tag:'CSidebarNavItem',
            name:'View Restaurant Owners',
            to:'/users/restaurant_owners/ViewOwners'
          }
        ],
        
      },
    ],
  },
  {
    _tag:'CSidebarNavDropdown',
    name:'Manage Restaurant Request',
    route:'/restaurant',
    icon:'cil-cursor',
    _children:[
      {
        _tag:'CSidebarNavItem',
        name:'Restaurant Request List',
        to:'/restaurant/RestaurantRequest',

      }
    ],
  },
  {
    _tag:'CSidebarNavDropdown',
    name:'Manage Membership',
    route:'/membership',
    icon:'cil-cursor',
    _children:[
      {
        _tag:'CSidebarNavItem',
        name:'Add Membership ',
        to:'/membership/AddMembership'
      },
      {
        _tag:'CSidebarNavItem',
        name:'Membership List',
        to:'/membership/ViewMembership'
      }
    ],
  },
  {
    _tag:'CSidebarNavDropdown',
    name:'Manage Payment',
    route:'/payment',
    icon:'cil-cursor',
    _children:[
      {
        _tag:'CSidebarNavItem',
        name:'View Payment',
        to:'/payment/ViewPayment'
      },
      {
        _tag:'CSidebarNavItem',
        name:'Send Payment',
        to:'/payment/SendPayment'
      }
    ],

  },

  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Buttons',
  //   route: '/buttons',
  //   icon: 'cil-cursor',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Brand buttons',
  //       to: '/buttons/brand-buttons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Dropdowns',
  //       to: '/buttons/button-dropdowns',
  //     }
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: 'cil-chart-pie'
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Icons',
  //   route: '/icons',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Notifications',
  //   route: '/notifications',
  //   icon: 'cil-bell',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Toaster',
  //       to: '/notifications/toaster'
  //     }
  //   ]
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: 'cil-calculator',
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   _tag: 'CSidebarNavDivider'
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Extras'],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Pages',
  //   route: '/pages',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Disabled',
  //   icon: 'cil-ban',
  //   badge: {
  //     color: 'secondary',
  //     text: 'NEW',
  //   },
  //   addLinkClass: 'c-disabled',
  //   'disabled': true
  // },
  // {
  //   _tag: 'CSidebarNavDivider',
  //   className: 'm-2'
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Labels']
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Label danger',
  //   to: '',
  //   icon: {
  //     name: 'cil-star',
  //     className: 'text-danger'
  //   },
  //   label: true
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Label info',
  //   to: '',
  //   icon: {
  //     name: 'cil-star',
  //     className: 'text-info'
  //   },
  //   label: true
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Label warning',
  //   to: '',
  //   icon: {
  //     name: 'cil-star',
  //     className: 'text-warning'
  //   },
  //   label: true
  // },
  // {
  //   _tag: 'CSidebarNavDivider',
  //   className: 'm-2'
  // }
]

export default _nav
