#! /usr/bin/env node

import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";

const res = await inquirer.prompt([
  {
    name: "userInput",
    type: "number",
    message: "Please enter the amount of Second",
    validate: (input) => {
      if (isNaN(input)) {
        return "please Enter Valid number.";
      } else if (input > 60) {
        return "Seconds must be in 60";
      } else {
        return true;
      }
    },
  },
]);

// let value = res.userInput;
// console.log(value)
let input = res.userInput;

function startTime(val: number) {
  const initial_Time = new Date().setSeconds(new Date().getSeconds() + val);
  const interval_Time = new Date(initial_Time);
  setInterval(() => {
    const current_Time = new Date();
    const time_difference = differenceInSeconds(interval_Time, current_Time);
    if (time_difference <= 0) {
      console.log("Time has expired.");
      process.exit();
    }
    const minute = Math.floor((time_difference % (3600 * 24)) / 3600);
    const seconds = Math.floor(time_difference % 60);
    console.log(
      `${minute.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
    );
  }, 1000);
}

startTime(input);
