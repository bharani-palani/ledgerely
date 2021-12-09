import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

const CountDown = props => {
    const {ccDetails} = props;
    const [mSec, setMsec] = useState(0);
    let days = Number(ccDetails.remDays);
    let seconds = days * 24 * 3600;
  
    useEffect(() => {
        if(Number(ccDetails.remDays) > 0) {
            startClock();
        }
      }, [ccDetails.remDays]);
    
    const startClock = () => {
        var days        = Math.floor(seconds/24/60/60);
        var hoursLeft   = Math.floor((seconds) - (days*86400));
        var hours       = Math.floor(hoursLeft/3600);
        var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
        var minutes     = Math.floor(minutesLeft/60);
        var remainingSeconds = seconds % 60;
        const timer = pad(days) + ":" + pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
        if (seconds === 0) {
            myStopFunction(startClock)
        } else {
            seconds--;
        }
        setMsec(timer);      
        setTimeout(startClock, 1000);
    };
  
    const myStopFunction = () => {
        clearTimeout(startClock)
    }
  
    const pad = (n) => {
      return (n < 10 ? "0" + n : n);
    }
  
    return (<span>{mSec}</span>);
}

CountDown.propTypes = {
  property: PropTypes.string,
};
CountDown.defaultProps = {
  property: "String name",
};

export default CountDown;