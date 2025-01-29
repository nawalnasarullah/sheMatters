import React from "react";
import { Typography } from "@mui/material";

export default function Pill({ value }) {
  return (
    <div className="bg-[#FCEAEA] rounded-full px-4 py-1 flex items-center">
      <Typography variant="body1" fontWeight="bold" className="capitalize">
        {value.replace(/_/g, " ")}
      </Typography>
    </div>
  );
}
