import { Col, Container } from './components/Ui';
import { Route, Routes } from 'react-router-dom';
import { publishRoutes } from './routers';
import { Fragment } from 'react';
import { DefaultLayout } from './Layouts';
import './App.scss';

function App() {
  return (
    <div className='bg-dark cl-light'>
      <Routes>
        {publishRoutes.map((route) => {
          const Layout = route.layout === null ? Fragment : route.layout || DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
