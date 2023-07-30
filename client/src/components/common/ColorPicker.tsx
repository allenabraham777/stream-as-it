import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

type ColorPickerProps = {
  show: boolean,
  color: string,
  onChange: (color: string) => void;
};

const ColorPicker = ({ show, color, onChange }: ColorPickerProps) => {
  if (!show) return null;
  const [pickerColor, setPickerColor] = useState(color);

  const confirm = () => {
    onChange(pickerColor);
  };

  const cancel = () => {
    onChange(color);
  };

  return <div className='flex flex-col bg-white border border-gray-500 border-opacity-20 rounded-lg relative p-2'>
    <SketchPicker disableAlpha className='!shadow-none !w-[inherit]' color={pickerColor} onChangeComplete={({ hex }) => setPickerColor(hex)} />
    <div className='flex justify-between p-4'>
      <button className='border border-gray-500 rounded-lg w-[40%] p-2 bg-green-200' onClick={confirm}>
        OK
      </button>
      <button className='border border-gray-500 rounded-lg w-[40%] p-2 bg-red-300' onClick={cancel}>
        Cancel
      </button>
    </div>
  </div>;
};

export default ColorPicker;