function getISTDate(): Date {
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  
    const [
      { value: month },,
      { value: day },,
      { value: year },,
      { value: hour },,
      { value: minute },,
      { value: second }
    ] = formatter.formatToParts(currentDate);
  
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  }
  
  function getEventStatus(startDate: string, endDate: string): string {
    const currentDate = getISTDate(); // Get current date in IST
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Reset time to midnight to only compare dates
    currentDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
  
    console.log("Current Date (IST, no time):", currentDate);
    console.log("Start Date (no time):", start);
    console.log("End Date (no time):", end);
  
    if (currentDate > end) {
      return "Completed";
    } else if (currentDate >= start && currentDate <= end) {
      return "Running";
    } else if (currentDate < start) {
      return "Upcoming";
    } else {
      return "Unknown";
    }
  }
  

  export { getEventStatus, getISTDate };