let process = [];

const AddProcess = async (req, res) => {
  const { name, arrivalTime, burstTime } = req.body;
  const newProcess = {
    id: process.length + 1,
    name: parseInt(name),
    arrivalTime: parseInt(arrivalTime),
    burstTime: parseInt(burstTime),
    turnaroundTime: null,
    waitingTime: null
  };
  process.push(newProcess);
<<<<<<< HEAD
  console.log(process);
  res.status(201).json({ process: process });
=======
  res.status(201).json({process});
>>>>>>> 5d1aa34dc723a943265a7f9550ac9c4ad3f74f95
};


const RunSimulation = async (req, res) => {
  process.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  let completedProcess=[];
  let TotalTAT = 0;
  let TotalWaitingTime = 0;
  while (process.length>0) {
    let sp = null;
    let index = -1;
    for (let i = 0; i < process.length; i++) {
      if (process[i].arrivalTime <= currentTime){
        if (sp == null || sp.remainingTime >=  process[i].remainingTime ) {
          sp= process[i];
          index = i;
        }
      }else{
        break;
      }
    }
    console.log(sp);
    if (sp != null) {
      if (sp.startTime == null) {
        sp.startTime = currentTime;
      }
      sp.remainingTime--;
      if (sp.remainingTime == 0) {
        sp.finishTime = currentTime +1;
        sp.turnaroundTime = sp.finishTime - sp.arrivalTime;
        sp.waitingTime = sp.turnaroundTime - sp.burstTime;
        TotalTAT += sp.turnaroundTime;
        TotalWaitingTime += sp.waitingTime;
        completedProcess.push(sp);
        process.splice(index, 1);
      }
    }
    currentTime++;
  }
  const avgTAT = TotalTAT/completedProcess.length;
  const avgWaitingTime = TotalWaitingTime/completedProcess.length;

  res.status(201).json({completedProcess,avgTAT,avgWaitingTime});
};




module.exports = { AddProcess, RunSimulation };
