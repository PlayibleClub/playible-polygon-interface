import PropTypes from 'prop-types';
import React from 'react';

const header = {
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

const Header = (props) => {
  const { children, color } = props;

  return (
    <div
      data-test="header"
      className={`bg-${color} bg-gradient-to-r from-indigo-navbargrad2 to-indigo-navbargrad1 w-full h-24 flex flex-row justify-end fixed z-40`}
      style={header}
    >
      {children}
    </div>
  );
};

Header.propTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Header.defaultProps = {
  color: 'indigo-light',
  // children: <div>Fantasy investr</div>
  children: <div />,
};

export default Header;
