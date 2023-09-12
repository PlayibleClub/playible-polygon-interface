import PropTypes from 'prop-types';
import React from 'react';

const PortfolioContainer = (props) => {
  const { color, textcolor, size, title, children, align, stats, searchbar } = props;
  const avgicon = '/../../public/images/avgscore.png';

  return (
    <>
      {/* <MobileView>
    <div data-test="portfoliocontainer" className={`text-${textcolor} bg-${color} text-${size} font-bold ${align} flex flex-col w-full `}>
      <div className="flex justify-between">
        <div className="pb-3 pt-6 justify-start text-xl">
          {title}
          <img src={'/images/blackunderline.png'} className="object-none" />
        </div>
        {stats ?
          <>
            <div className="px-2 py-1 text-lg rounded-md bg-indigo-green text-center self-center content-center mt-2 mr-7">
              {stats}
            </div>
          </>
          :
          <>
          </>
        }
      </div>
      <div className="flex justify-center flex-col">
        {children}
      </div>

    </div>
    </MobileView> */}
      {/* <BrowserView> */}
      <div
        data-test="portfoliocontainer"
        className={`text-${textcolor} bg-${color} text-${size} font-bold ${align} flex flex-col `}
      >
        <div className="flex">
          {stats ? (
            <div className="flex w-full">
              <div className=" text-2xl pb-3 pt-20 md:pt-14 ml-7 justify-between align-center">
                {title}
                <img src={'/images/blackunderline.png'} className="object-none" />
              </div>
              <div
                className="w-32 h-32 flex justify-center items-center ml-10"
                style={{
                  backgroundImage: "url('/images/icons/FantasyAverageScore.svg')",
                  backgroundRepeat: 'no-repeat',
                  width: '135px',
                  height: '135px',
                }}
              >
                <div className="text-center text-xl w-full text-indigo-white font-thin font-monument">
                  {stats}
                </div>
              </div>
            </div>
          ) : (
            <div className="pb-3 w-full pt-6 ml-6 flex flex-col justify-between md:flex-row align-center text-2xl font-monument">
              <div className="-ml-1 md:-ml-0">
                {title}
                <img src={'/images/blackunderline.png'} className="object-none" />
              </div>
              <div className="text-sm mt-4 md:mt-0 md:ml-80 md:mr-20 font-montserrat">
                {searchbar ? searchbar : ''}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center flex-col">{children}</div>
      </div>
      {/* </BrowserView> */}
    </>
  );
};

PortfolioContainer.propTypes = {
  title: PropTypes.string.isRequired,
  textcolor: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  stats: PropTypes.number,
  searchbar: PropTypes.any,
};

PortfolioContainer.defaultProps = {
  textcolor: 'white-light',
  color: 'white',
  size: '1xl',
  align: 'justify-start',
  children: <div />,
};

export default PortfolioContainer;
