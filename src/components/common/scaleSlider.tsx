import * as React from 'react';
import { RangeSlider, SliderLabel } from '@progress/kendo-react-inputs';

interface scaleSliderProps {
    start: number,
    end: number
}
interface scaleSliderOptionsProps {
    defaultValue: scaleSliderProps,
    step: number,
    min: number,
    max: number,
    rangeValues?: string[],
    setStartTime: any,
    setEndTime: any
}

interface startEndTimeProps {
    start: any,
    end: any
}

const scaleSlider = (props: scaleSliderOptionsProps) => {

    const handleOnChange = (e: any) => {
        const val: startEndTimeProps = e?.value;
        props.setStartTime(val?.start)
        props.setEndTime(val?.end)
    }

    return (
        <div className="mx-1 scheduling-ctrl" >
            <RangeSlider
                id="Range-Slider"
                aria-labelledby="Range-Slideraria"
                aria-describedby="Range-Slideraria"
                defaultValue={props?.defaultValue}
                step={props?.step}
                min={props?.min}
                max={props?.max}
                onChange={(e) => { handleOnChange(e) }}
            >
                {props.rangeValues?.map((perc, i) => (
                    <SliderLabel
                        aria-labelledby="Slider-Label"
                        aria-describedby="Slider-Label"
                        key={i}
                        position={parseFloat(perc ? perc : "0")}                    >
                        {perc?.toString()}
                    </SliderLabel>
                ))}
            </RangeSlider>
        </div>
    );
}

export default scaleSlider;