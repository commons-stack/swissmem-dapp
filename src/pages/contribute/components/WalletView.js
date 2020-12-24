import React, { useContext } from 'react';
import { connect } from 'react-redux';
import DAI from 'cryptocurrency-icons/svg/color/dai.svg';
import ETH from 'cryptocurrency-icons/svg/color/eth.svg';
import { OnboardContext } from '../../../components/OnboardProvider';
import CSTK from '../../../assets/cstk.svg';
import TandC from './TandC';
import Statutes from './Statutes';

const coinLogos = [
  { symbol: 'DAI', src: DAI },
  { symbol: 'ETH', src: ETH },
  { symbol: 'CSTK', src: CSTK },
  // { symbol: "ANT", src: ANT },
  // { symbol: "BAT", src: BAT },
];

const Comp = ({
  agreedtandc,
  agreedstatutes,
  balances,
  getBalancesFor,
  getUserState,
  userIsWhiteListed,
}) => {
  const { web3, address, onboard, network, isReady } = useContext(OnboardContext);

  // TODO: this should be moved to the store IMO
  React.useEffect(() => {
    if (isReady) {
      getBalancesFor(address);
    }
  }, [isReady, address, getBalancesFor]);

  React.useEffect(() => {
    if (web3 && address) {
      getUserState(address);
    }
  }, [onboard, web3, address, network, getUserState]);
  // TODO: Will be pulled form the state, just for now
  const defaultCoins = [
    {
      symbol: 'DAI',
      contractaddress: '0xad6d458402f60fd3bd25163575031acdce07538d',
    },
    {
      symbol: 'ETH',
    },
    // {
    //   symbol: "ANT",
    // },
    // {
    //   symbol: "BAT",
    // },
  ];

  const coins = (balances && balances[address] && balances[address]) || defaultCoins;

  // DAI balance
  const daiBalance = coins
    .filter(coin => {
      return coin.symbol === 'DAI';
    })
    .map(coin => {
      const logo = coinLogos.find(coinIcon => {
        return coinIcon.symbol === coin.symbol;
      });
      return (
        isReady && (
          <div key={coin.symbol} className="title level mb-04">
            <div className="subtitle level-left mb-04">
              <span className="icon has-text-light mr-02">
                <img src={logo.src} alt={coin.symbol} />
                &nbsp;
              </span>
              {coin.symbol}
            </div>
            <div className="subtitle level-right mb-04">
              {coin.status || coin.balanceFormatted || '~'}
              {coin.symbol}
            </div>
          </div>
        )
      );
    });

  // all other known balances - except DAI
  const otherBalances = coins.reduce((accum, coin) => {
    if (coin.symbol === 'DAI') return accum;
    const logo = coinLogos.find(coinIcon => {
      return coinIcon.symbol === coin.symbol;
    });

    accum.push(
      <div key={coin.symbol} className="title level mb-04">
        <div className="subtitle level-left mb-04">
          <span className="icon has-text-light mr-02">
            <img src={logo.src} alt={coin.symbol} />
            &nbsp;
          </span>{' '}
          {coin.symbol}
        </div>
        {balances && balances[address] ? (
          <div className="subtitle level-right mb-04">
            {coin.balanceFormatted} {coin.symbol}
          </div>
        ) : (
          <div className="subtitle level-right mb-04">
            <span>~DAI</span>
          </div>
        )}
      </div>,
    );
    return accum;
  }, []);

  if (!agreedtandc && address) {
    return <TandC />;
  }
  if (!agreedstatutes && address) {
    return <Statutes />;
  }

  const successIcon = (
    <>
      <span className="icon has-text-success">
        <i className="fas fa-check-circle" />
      </span>
    </>
  );

  const failIcon = (
    <span className="icon">
      <i className="fas fa-times-circle" />
    </span>
  );
  return (
    <>
      <p className="title is-text-overflow mb-2">Membership Terms</p>
      <div className="subtitle mb-05">
        <div className="title-level">
          <div className="level-left">
            {agreedtandc ? (
              <>
                <span>{successIcon}</span>
              </>
            ) : (
              <>
                <span>{failIcon}</span>{' '}
              </>
            )}
            <span className="is-size-7">Sign Terms and Conditions</span>
          </div>
          <div className="level-left">
            {agreedstatutes ? (
              <>
                <span>{successIcon}</span>
              </>
            ) : (
              <>
                <span>{failIcon}</span>
              </>
            )}
            <span className="is-size-7">Sign Statutes</span>
          </div>

          <div className="level-left">
            {userIsWhiteListed ? successIcon : failIcon}
            <span className="is-size-7">Member of the Trusted Seed (Allowlist)</span>
          </div>
        </div>
      </div>
      <br />
      <span className="title is-text-overflow mb-2">
        Total Available Balance{' '}
        <a
          href={`https://etherscan.io/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-info-circle is-size-7" />
        </a>
      </span>

      {address && isReady ? (
        <>
          <p className="truncate is-size-7 mb-2">{address}</p>
          {daiBalance}
          {otherBalances}
        </>
      ) : (
        <>
          <br />
          <br />
          <p className="subtitle mb-1 has-text-centered is-italic">
            Connect wallet to verify membership terms and your CSTK Score
          </p>
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ balances, agreedtandc, agreedstatutes, userIsWhiteListed }) => {
  return {
    agreedtandc,
    agreedstatutes,
    balances,
    userIsWhiteListed,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
    getBalancesFor: address => {
      dispatch({ type: 'GET_BALANCES_FOR_ADDRESS', address });
    },
    getUserState: address => {
      dispatch({ type: 'READ_SHOW_TANDC', address });
      dispatch({ type: 'READ_SHOW_STATUTES', address });
      dispatch({ type: 'GET_USER_IS_WHITELISTED', address });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
