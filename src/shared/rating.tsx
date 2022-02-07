import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Rating(props: RatingProps) {

    const [maxValueArr, setMaxValueArr] = useState<string[]>([]);

    useEffect(() => {
        setMaxValueArr(Array(props.maxValue).fill(0));
    }, [props.maxValue])

    return(
        <>
        {maxValueArr.map((_, index) => {
            return(
                <FontAwesomeIcon icon={'star'} key={index} className={`fa-lg pointer`} />
            );
        })}
        </>
    );
}

interface RatingProps {
maxValue: number;
selectedValue: number;
onChange(value: number): void;
}