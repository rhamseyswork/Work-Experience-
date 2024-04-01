import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './assets/Nav Bar.css';

const NavBar = ({ tabs, gap = '20px', display = 'flex', flexDirection = 'row', listStyleType = 'none', textDecoration = 'none', color = 'black', padding = '0px', hover = 'default', children }) => {
  const location = useLocation();
  return (
    <nav className='navBar'>
      {children}
      <ul style={{ listStyleType, padding, display, flexDirection, gap }}>
        {Array.isArray(tabs) && tabs.map((tab) => (
          <li key={tab.id}>
            <Link style={{ textDecoration, color }} className={location.pathname === tab.path ? 'active' : (hover === 'default' ? 'default' : hover)}  to={tab.path}>
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  gap: PropTypes.string,
  display: PropTypes.string,
  flexDirection: PropTypes.string,
  listStyleType: PropTypes.string,
  textDecoration: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  hover: PropTypes.string,
  children: PropTypes.node,
};

NavBar.defaultProps = {
  tabs: [],
  gap: '20px',
  display: 'flex',
  flexDirection: 'row',
  listStyleType: 'none',
  textDecoration: 'none',
  color: 'black',
  padding: '0px',
  hover: 'default',
};

export default NavBar;
