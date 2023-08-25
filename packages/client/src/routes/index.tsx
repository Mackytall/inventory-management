import { lazy, ReactNode } from 'react';
import uniqid from 'uniqid';

//import AdminRoute from './AdminRoute';
//import PrivateRoute from './PrivateRoute';
const Wrapper = lazy(() => import('../components/Wrapper'));
// const Auth = lazy(() => import('../pages/auth/Auth'));
const Books = lazy(() => import('../pages/books/Books'));
const EditBook = lazy(() => import( '../pages/books/create/EditBook'));
const ScanIsbn = lazy( () => import ('../pages/books/ScanIsbn'));
const NewHu = lazy(() => import ( '../pages/books/NewHu'));


export type Route = {
  id: string;
  path: string;
  component: ReactNode;
};

export const routes: Route[] = [
  // {
  //   id: uniqid(),
  //   path: '/',
  //   component: (
  //     <Wrapper>
  //       <Auth />
  //     </Wrapper>
  //   ),
  // },
 
];
