import dayjs from 'dayjs';
import React, { ReactNode, useEffect, useState } from 'react';

type CountdownProps = {
    endTime: string // passe um formato de data
    expiredText?: string | ReactNode
}

type TimeLeft = {
    days: number
    hours: number
    minutes: number
}

const Countdown: React.FC<CountdownProps> = ({ endTime, expiredText = 'Atrasado' }) => {
    const calculateTimeLeft = (): TimeLeft | null => {
        const now = dayjs().add(-3, 'hour') // retirando a hora aqui pois ele entende como GMT e não GMT -3
        const end = dayjs(endTime)

        const difference = end.diff(now, 'minute')

        if (difference <= 0) {
            return null;
        }

        return {
            days: Math.floor(difference / (60 * 24)),
            hours: Math.floor((difference % (60 * 24)) / 60),
            minutes: difference % 60,
        };
    };

    const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateTimeLeft> | null>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime, endTime]);

    if (!timeLeft) {
        return <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>{expiredText}</div>;
    }

    return (
        <div style={{ display: 'flex', gap: '0.25rem' }}>
            <span>{timeLeft.days > 0 && `${timeLeft.days}d `}</span>
            <span>{timeLeft.hours > 0 && `${timeLeft.hours}h `}</span>
            <span>{timeLeft.minutes}m </span>
        </div>
    );
};

export default Countdown;
