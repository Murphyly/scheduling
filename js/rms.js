class Task {
    constructor(period, executionTime) {
      this.period = period; // Task period
      this.executionTime = executionTime; // Task execution time
      this.remainingTime = period; // Remaining time until next execution
    }
  }
  
  // Array of tasks
  const tasks = [
    new Task(4, 2),
    new Task(6, 3),
    new Task(10, 5)
  ];
  
  // Simulation duration
  const simulationTime = 20;
  
  // Function to simulate RMS scheduling
  function simulateRMS() {
    let schedule = ""; // String to store the schedule
  
    // Iterate over each time unit
    for (let time = 0; time < simulationTime; time++) {
      let minPeriod = Infinity;
      let currentTask = null;
  
      // Find the task with the shortest period
      tasks.forEach(task => {
        if (task.period < minPeriod && task.remainingTime > 0) {
          minPeriod = task.period;
          currentTask = task;
        }
      });
  
      // If a task is found, execute it
      if (currentTask) {
        schedule += `Task ${tasks.indexOf(currentTask) + 1} `;
        currentTask.remainingTime--;
  
        // If the task is completed, reset the remaining time
        if (currentTask.remainingTime === 0) {
          currentTask.remainingTime = currentTask.period;
        }
      } else {
        schedule += "Idle "; // No task is scheduled, so it's idle time
      }
    }
  
    return schedule;
  }
  
  // Run the simulation
  const schedule = simulateRMS();
  
  // Output the schedule
  console.log(`Schedule: ${schedule}`);
//   In this example, the Task class represents each individual task with its period and execution time. The tasks array holds the tasks to be scheduled. The simulationTime variable defines the duration of the simulation.

//   The simulateRMS() function implements the RMS scheduling algorithm. It iterates over each time unit, finds the task with the shortest period, executes it, and updates the remaining time. If no task is found, it adds an "Idle" indication to the schedule. The function returns the resulting schedule string.
  
//   Finally, the code runs the simulation and outputs the generated schedule using console.log().
  
//   Please note that this code provides a simplified simulation of RMS scheduling and doesn't include features like task priority, preemption, or task set feasibility checking. It's intended to give you a basic understanding of how RMS works.  