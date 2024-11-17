import React from "react";
import { Typography, Button } from "@mui/material";
import { cardData } from "./Data";


function TherapyCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mt-4">
      {cardData.map((item, index) => (
        <div
          key={index}
          className="hero-card rounded-lg shadow-lg p-4 flex flex-col justify-between items-center"
        >
          <img src={item.img} className="w-40" alt="" />
          <div>
            <Typography variant="h6" component="div" className="font-bold">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              {item.description}
            </Typography>
            <Button variant="text">
              {item.cta}{" "}
              <span>
                <i class="fa-solid fa-chevron-right ps-1 pb-2 text-[10px]"></i>
              </span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TherapyCard;
