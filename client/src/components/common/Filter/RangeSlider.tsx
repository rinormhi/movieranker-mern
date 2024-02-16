import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';


const Input = styled(MuiInput)`
  width: 50px;
  color:white;
`;

export default function RangeSlider() {
    const [value, setValue] = React.useState<number[]>([1900, 2024]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue([...value, Number(event.target.value)]);
    }

    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={1900}
                max={2024}
                step={1}
            />
            <Input
                value={value[0]}
                size="small"
                onChange={handleInputChange}
                className='text-color-white'
                inputProps={{
                    step: 1,
                    min: 0,
                    max: 2000,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
            ></Input>
        </Box >
    );
}