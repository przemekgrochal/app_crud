import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, TasksPage, ProfilePage, UsersPage } from './pages';

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/users/profile',
    component: ProfilePage
  },
  {
    path: '/users/list',
    component: UsersPage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
