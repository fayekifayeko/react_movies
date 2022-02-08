import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthunticateContext from "../context/authenticateContext";
import '../stylings/rating.css';

export default function Rating(props: RatingProps) {

    const [maxValueArr, setMaxValueArr] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState(props.selectedValue);
    const {claims} = useContext(AuthunticateContext);


    useEffect(() => {
        setMaxValueArr(Array(props.maxValue).fill(0));
    }, [props.maxValue])

    function handleOnMouseOver(rate: number) {
        setSelectedValue(rate);
    }

    function handleOnClick(rate: number) {
        if(claims.length <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'You need to login'
            })
            return;
        } 
        setSelectedValue(rate);
        props.onChange(rate);
    }

    return(
        <>
        {maxValueArr.map((_, index) => {
            return(
                <FontAwesomeIcon
                onMouseOver={() => handleOnMouseOver(index + 1)}
                onClick={() => handleOnClick(index+1)}
                icon={'star'} 
                key={index} 
                className={`fa-lg pointer ${selectedValue >= index+1  ? 'checked' : null}`} />
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