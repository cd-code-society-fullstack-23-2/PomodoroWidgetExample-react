import React, { useState, useEffect } from 'react';
import Card from "../../components/card/Card"

const PomodoroWidget = () => {
    // Setting a constant variable called timeleft and creating a 
    // function called setTimeleft and setting the initial value to 60
    const [timeLeft, setTimeLeft] = useState(60);

    // Setting the constand variavle isActive and a function called setIsActive
    // and isActive is equal to false
    const [isActive, setIsActive] = useState(false);

    // We set a const variable to toggle and toggle is equal a thick arrow function
    const toggle = () => {
        // we call function setIsActive and send in the opposite of isActive so if
        // is active is = true it will change it to false 
        setIsActive(!isActive);
    }

    // Creating a constant variable reset a making it equal to a thick arrow function
    const reset = () => {
        // We call function setTimeLeft and sending in 60 to set the value of timeLeft
        setTimeLeft(60);
        
        setIsActive(false);
    }

    // Tick down the timer every second when active
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => {
                    if (timeLeft >= 1) return timeLeft - 1
                    // Reset when time runs out
                    reset();
                    return 0;
                });
            }, 1000);
        } else if (!isActive && timeLeft !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);
    return (
        <Card>
            <div className="time">
                {timeLeft}s
            </div>
            <div className="row">
                <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className="button" onClick={reset}>
                    Reset
                </button>
            </div>
        </Card>
    )
}

export default PomodoroWidget;