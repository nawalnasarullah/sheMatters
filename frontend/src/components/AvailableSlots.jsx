import { ThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import theme from "./Theme";
import { Typography } from "@mui/material";

function AvailableSlots({ 
  psychologistId, 
  slotIndex, 
  setSlotIndex, 
  slotTime, 
  setSlotTime, 
  selectedDate, 
  setSelectedDate 
}) {

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [slots, setSlots] = useState([]);

  const getAvailableSlots = async () => {
    setSlots([]);

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(23, 59, 59);

      if (today.getDay() === currentDate.getDay()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    if (slots.length > 0 && slots[slotIndex]?.length > 0) {
      setSelectedDate(slots[slotIndex][0].datetime.toISOString().split("T")[0]);
    }
  }, [slotIndex, slots, setSelectedDate]);

  useEffect(() => {
    getAvailableSlots();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="h5" color="primary.main" sx={{ marginBottom: "10px", fontSize: "1.2rem" }}>
          Booking Slots
        </Typography>

        <div className="flex gap-3 items-center w-full mt-4">
          {slots.length > 0 && slots.map((slot, index) => (
            <div 
              key={index}
              onClick={() => setSlotIndex(index)} 
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "border-2 border-secondary"}`}
            >
              <Typography variant="body1">{slot[0] && daysOfWeek[slot[0].datetime.getDay()]}</Typography>
              <Typography variant="body1">{slot[0] && slot[0].datetime.getDate()}</Typography>
            </div>
          ))}
        </div>

        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 scrollbar-hide">
          {slots.length > 0 && slots[slotIndex]?.map((slot, index) => (
            <p 
              key={index} 
              onClick={() => setSlotTime(slot.time)} 
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === slot.time ? "bg-primary text-white" : "border-2 border-secondary"}`}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AvailableSlots;
