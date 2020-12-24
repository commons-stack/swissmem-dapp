import React from 'react';
import './Success.sass';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { TwitterShareButton, TelegramShareButton, TwitterIcon, TelegramIcon } from 'react-share';
import checkmark from '../../../assets/success_checkmark.svg';
import cstktoken from '../../../assets/cstk.svg';

const Success = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <Confetti width={width} height={height} colors={['#AECAAC']} recycle={false} />
      <div className="is-flex-direction-column is-justify-items-center">
        <img src={checkmark} alt="success" className="success-checkmark" />
        <h1 className="is-size-5 has-text-centered pt-2">Thank you for the contribution</h1>
        <p className="has-text-centered pt-2">Your CSTK score</p>
        <div className="is-flex is-justify-content-center is-align-content-center">
          <img src={cstktoken} alt="CSTK Token" width="32px" height="32px" />
          <strong className="is-size-5 ml-1">(todo: add $value) CSTK</strong>
        </div>
        <p className="has-text-centered pt-2">Will be transferred to your Ethereum address soon.</p>
        <div className="button-container pt-6">
          <TwitterShareButton url="https://commonsstack.org" title="I funded the Commons Stack!">
            <button className="button is-info">
              <TwitterIcon size={32} round className="mr-2" /> Share on Twitter
            </button>
          </TwitterShareButton>
          <TelegramShareButton url="https://commonsstack.org" title="I funded the Commons Stack!">
            <button className="button is-info">
              <TelegramIcon size={32} round className="mr-2" /> Share on Telegram
            </button>
          </TelegramShareButton>
        </div>
      </div>
    </div>
  );
};

export default Success;
