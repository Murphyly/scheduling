class Task {
    constructor(period, executionTime, priority) {
      this.period = period; // Task period
      this.executionTime = executionTime; // Task execution time
      this.remainingTime = period; // Remaining time until next execution
      this.priority = priority; // Task priority
    }
  }
  
  // Array of tasks
  const tasks = [
    new Task(5, 3, 3),
    new Task(7, 4, 2),
    new Task(11, 6, 4)
  ];
  
  // Simulation duration
  const simulationTime = 20;
  
  // Function to simulate RMS scheduling
  function simulateRMS() {
    let schedule = ""; // String to store the schedule
  
    // Calculate the least common multiple (LCM) of task periods
    const lcm = calculateLCM();
  
    // Check if the task set is feasible
    if (!isTaskSetFeasible(lcm)) {
      return "Task set is not feasible.";
    }
  
    // Iterate over each time unit
    for (let time = 0; time < simulationTime; time++) {
      let highestPriority = Infinity;
      let currentTask = null;
  
      // Find the highest priority task with remaining time
      tasks.forEach(task => {
        if (task.priority < highestPriority && task.remainingTime > 0) {
          highestPriority = task.priority;
          currentTask = task;
        }
      });
  
      // If a task is found, execute it
      if (currentTask) {
        schedule += `Task ${tasks.indexOf(currentTask) + 1} `;
        currentTask.remainingTime--;
  
        // If the task is preempted, reset the remaining time
        if (currentTask.remainingTime === 0) {
          currentTask.remainingTime = currentTask.period;
        }
      } else {
        schedule += "Idle "; // No task is scheduled, so it's idle time
      }
    }
  
    return schedule;
  }
  
  // Function to calculate the least common multiple (LCM) of task periods
  function calculateLCM() {
    let periods = tasks.map(task => task.period);
    let lcm = periods[0];
  
    for (let i = 1; i < periods.length; i++) {
      lcm = (lcm * periods[i]) / calculateGCD(lcm, periods[i]);
    }
  
    return lcm;
  }
  
  // Function to calculate the greatest common divisor (GCD) of two numbers
  function calculateGCD(a, b) {
    if (b === 0) {
      return a;
    }
  
    return calculateGCD(b, a % b);
  }
  
  // Function to check if the task set is feasible
  function isTaskSetFeasible(lcm) {
    const totalUtilization = tasks.reduce(
      (sum, task) => sum + task.executionTime / task.period,
      0
    );
  
    return totalUtilization <= tasks.length * (Math.pow(2, 1 / tasks.length) - 1);
  }
  
  // Run the simulation
  const schedule = simulateRMS();
  
  // Output the schedule
  console.log(`Schedule: ${schedule}`);
  
  In this improved version, I've added the following features:
  
    //   Task Priority: The Task class now includes a priority property, representing the priority of each task. The scheduling algorithm selects the task with the highest priority for execution.
  
    //   Preemption: If a task is preempted (its remaining time reaches zero), the algorithm resets its remaining time to its period. This allows the task to be scheduled again in subsequent periods.
  
    //   **Task