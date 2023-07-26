import React, { useState, useEffect } from 'react';
import Card from "../../components/card/Card"

// Declare a functional component called 'PomodoroWidget'.
// In React, a component is a self-contained piece of code that manages its own content, presentation, and behavior.
const PomodoroWidget = () => {

    // useState is a Hook that lets you add React state to function components. Here we declare a new state variable, which we'll call "timeLeft". 
    // This state is initially set to 60.
    const [timeLeft, setTimeLeft] = useState(60);
    
    // Here we declare a new state variable called "isActive". This will represent if the Pomodoro timer is active or not.
    // Its initial state is false, representing that the timer is not active.
    const [isActive, setIsActive] = useState(false);

    // This function 'toggle' when invoked, will set the state of 'isActive' to its opposite value. 
    // If it's false, it will become true and vice versa.
    const toggle = () => {
        setIsActive(!isActive);
    }

    // This function 'reset' when invoked, will set 'timeLeft' back to 60 and 'isActive' to false, effectively resetting the timer.
    const reset = () => {
        setTimeLeft(60);
        setIsActive(false);
    }

    // useEffect is a function that allows you to perform side effects in function components. Side effects could be data fetching, 
    // subscriptions, or manually changing the DOM. Here it's used to manage the timer countdown and cleanup.
    useEffect(() => {
        // 'interval' is a variable to store the reference of the timer.
        let interval = null;
        // If 'isActive' is true, then set the interval to reduce the 'timeLeft' by one every second.
        if (isActive) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => {
                    // If 'timeLeft' is greater or equal to 1, then reduce it by 1.
                    if (timeLeft >= 1) return timeLeft - 1
                    // If 'timeLeft' runs out, reset the timer.
                    reset();
                    return 0;
                });
            }, 1000);
        } else if (!isActive && timeLeft !== 0) {
            // If 'isActive' is false and 'timeLeft' is not equal to zero, clear the interval.
            clearInterval(interval);
        }
        // When component is unmounted or before next render 'useEffect' will cleanup by clearing the interval.
        return () => clearInterval(interval);
    }, [isActive, timeLeft]); // This effect depends on the 'isActive' and 'timeLeft' state. It will run after every render where 'isActive' or 'timeLeft' changes.

    // Finally, the component returns a 'Card' component with a timer and buttons to start/pause and reset the timer.
    // The className for the start/pause button changes depending on whether the timer is active.
    // The onClick handler for the start/pause button will toggle the 'isActive' state, effectively starting and pausing the timer.
    // The onClick handler for the reset button will reset the timer to its initial state.
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

// The 'PomodoroWidget' component is then exported so it can be imported and used by other components or modules.
export default PomodoroWidget;
