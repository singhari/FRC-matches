import { trackedEvent } from "./tracker.js";

const schedule = await fetch("/testAllSchedule.json").then(response => response.json());
const results = await fetch("/testMatchResults.json").then(response => response.json());
const teamSchedule = await fetch("/testTeamSchedule.json").then(response => response.json());

// console.log(schedule);
// console.log(results);
const test = new trackedEvent(schedule, results, 7159, teamSchedule);
console.log(test);