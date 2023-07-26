import React, { useState, useEffect } from 'react';
import Card from "../../components/card/Card"

const PomodoroWidget = () => {
    // Time is in seconds for simplicity
    const [timeLeft, setTimeLeft] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const toggle = () => {
        setIsActive(!isActive);
    }

    const reset = () => {
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