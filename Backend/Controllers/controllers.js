let process = [];

const AddProcess = async (req, res) => {
  const { arrivalTime, burstTime } = req.body;
  const newProcess = {
    id: process.length + 1,
    arrivalTime: parseInt(arrivalTime),
    burstTime: parseInt(burstTime),
    remainingTime: parseInt(burstTime),
    startTime: null,
    finishTime: null,
    turnaroundTime: null,
    waitingTime:null
  };
  process.push(newProcess);
  console.log(process);
  res.status(201).json({process});
};

const RunSimulation = async (req, res) => {
  // Sort processes by arrival time
  process.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  let completedProcesses = [];
  let totalTurnaroundTime = 0;
  let totalWaitingTime = 0;

  while (process.length > 0) {
    let shortestProcess = null;
    let shortestIndex = -1;

    // Find the process with the shortest remaining time
    for (let i = 0; i < process.length; i++) {
      if (process[i].arrivalTime <= currentTime) {
        if (
          shortestProcess === null ||
          process[i].remainingTime < shortestProcess.remainingTime
        ) {
          shortestProcess = process[i];
          shortestIndex = i;
        }
      } else {
        break;
      }
    }

    // Update start time if the process has not started yet
    if (shortestProcess != null) {
      if (shortestProcess.startTime === null) {
        shortestProcess.startTime = currentTime;
      }

      // Execute the process for 1 unit of time
      shortestProcess.remainingTime--;

      // Check if the process is completed
      if (shortestProcess.remainingTime === 0) {
        shortestProcess.finishTime = currentTime + 1;
        shortestProcess.turnaroundTime =
          shortestProcess.finishTime - shortestProcess.arrivalTime;
        shortestProcess.waitingTime = shortestProcess.turnaroundTime - shortestProcess.burstTime;
        totalTurnaroundTime += shortestProcess.turnaroundTime;
        totalWaitingTime += shortestProcess.waitingTime;
        completedProcesses.push(shortestProcess);
        process.splice(shortestIndex, 1);
      }
    }
    currentTime++;
  }

  const averageTurnaroundTime = totalTurnaroundTime / completedProcesses.length;
  const avgerageWaitingTime = totalWaitingTime / completedProcesses.length;
  res.json({ completedProcesses, averageTurnaroundTime, avgerageWaitingTime });
};

module.exports = { AddProcess, RunSimulation };
