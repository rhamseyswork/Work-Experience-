// By: Rhamseys Garcia
// Date: 2024-03-31

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// NavBar
import NavBar from './components/Nav Bar/Nav Bar'; // Corrected import path
import NavBarData from './components/Nav Bar/assets/Nav Bar Tabs'; // Corrected import path

// Error 404 Page
import Error404 from './Pages/404/404';
import Home from './Pages/Home/Home';


const LazyLoadPage = ({ tab }) => {
  const capitalizeWords = (str) => {
    return str.split('/').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  };
  const capitalizedTab = capitalizeWords(tab);
  const PageComponent = React.lazy(() => import(`./Pages/${capitalizedTab}/${capitalizedTab}.jsx`).catch(() => ({ default: () => <Error404 /> })));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageComponent />
    </Suspense>
  );
};

LazyLoadPage.propTypes = {
  tab: PropTypes.string.isRequired,
};

const App = () => {
  return (
    <div className='APP'>
      <Suspense fallback={<div>Nav bar Loading...</div>}>
        {/* Corrected component name to NavBar */}
        <NavBar tabs={NavBarData.tabs}> 
          {NavBarData.title}
        </NavBar>
      </Suspense>
      <Routes>
        {/* Define your routes properly */}
        <Route path='/' element={<Home />} />
        {NavBarData.tabs.map((tab) => {
    return (
      <Route key={tab.id} path={tab.path} element={<LazyLoadPage tab={tab.path} />} />
    );
  })}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
