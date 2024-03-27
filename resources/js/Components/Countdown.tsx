import { DateTime, Duration } from "luxon";
import { useState } from "react";

import { useInterval } from "@/hooks/useInterval";

export function Countdown({
    endDateTimeStamp,
    onFinish,
}: {
    endDateTimeStamp: string;
    onFinish?: () => void;
}) {
    const endTime = DateTime.fromISO(endDateTimeStamp);
    const initialRemainingTime = Duration.fromMillis(
        endTime.diff(DateTime.now()).toMillis(),
    );

    const [remainingTime, setRemainingTime] = useState(initialRemainingTime);
    const [isCountdownRunning, setIsCountdownRunning] = useState(
        initialRemainingTime.as("milliseconds") > 0,
    );

    useInterval(
        () => {
            const now = DateTime.local();
            const remainingDuration = Duration.fromMillis(
                endTime.diff(now).toMillis(),
            );

            if (remainingDuration.as("milliseconds") <= 0) {
                setRemainingTime(Duration.fromMillis(0));
                setIsCountdownRunning(false);
                if (onFinish) {
                    onFinish();
                }
            } else {
                setRemainingTime(remainingDuration);
            }
        },
        isCountdownRunning ? 1000 : null,
    );

    const formatRemainingTime = (duration: Duration) => {
        const minutes = Math.floor(duration.as("minutes"));
        const seconds = Math.floor(duration.as("seconds") % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return <div>{formatRemainingTime(remainingTime)}</div>;
}
