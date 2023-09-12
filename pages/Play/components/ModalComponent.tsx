import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const PlayComponent = (props) => {
  const { teamName, reward, score, win } = props;
  const rewardicon = '/../public/images/icons/Reward.svg';
  const bars = '/../public/images/icons/Ranking.png';

  return (
    <>
      {win === 'n' ? (
        <div className="my-8 text-base">
          <div className="flex justify-between">
            <div className="text-indigo-white bg-indigo-black py-2 px-6 font-bold">{teamName}</div>
          </div>
        </div>
      ) : (
        <div className="my-8 text-base">
          <div className="flex justify-between">
            <div className="text-indigo-white bg-indigo-black py-2 px-6 font-bold">{teamName}</div>
          </div>

          <div className="flex mt-2">
            <div className="flex">
              <div className="mr-2">
                <Image src={rewardicon} height={15} width={15} alt="reward-icon" />
              </div>
              <div className="font-bold">{reward}</div>
            </div>

            <div className="flex ml-4">
              <div className="mr-2">
                <Image src={bars} height={15} width={15} alt="bars-icon" />
              </div>
              <div className="font-bold">{score}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

PlayComponent.propTypes = {
  icon: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  prizePool: PropTypes.string.isRequired,
  currPlayers: PropTypes.string.isRequired,
  maxPlayers: PropTypes.string.isRequired,
  timeLeft: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  img: PropTypes.string,
};

export default PlayComponent;
