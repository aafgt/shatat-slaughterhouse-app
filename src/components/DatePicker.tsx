import { useRef } from 'react';

interface DatePickerProps {
  selectedDate?: string; // initial date in 'yyyy-mm-dd' format
  setSelectedDate?: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, setSelectedDate }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate?.(e.target.value); // Already in yyyy-mm-dd format
  };

  const openCalendar = () => {
    inputRef.current?.showPicker?.(); // Only works in some modern browsers
    inputRef.current?.focus(); // Fallback for older ones
  };

  return (
    <div className="relative inline-block">
      <button onClick={openCalendar} className="px-4 py-2 bg-green-950 text-white rounded hover:bg-black hover:cursor-pointer">
        {selectedDate || 'Select a date'}
      </button>

      {/* Hidden date input */}
      <input
        ref={inputRef}
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="absolute w-0 h-0 opacity-0 -z-10 pointer-events-none"
      />
    </div>
  );
};

export default DatePicker;
