
/**
 * Calculate the age difference in years from the given date of birth.
 * @param {string|Date} dob 
 * @returns {number} age difference in years
 */

function getAgeDifference(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let ageDiff = today - birthDate;

  // Convert milliseconds to years
  const age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  return age;
}


/**
 * Format date of birth to 'YYYY-MM-DD' format.
 * @param {string|Date} dob 
 * @returns {string} formatted date of birth in 'YYYY-MM-DD' format
 */
function formateDob(dob) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dob).toLocaleDateString('en-CA', options);
}

/**
 * Format time to 'HH:MM AM/PM' format.
 * @param {string|Date} date 
 * @returns {string} formatted time in 'HH:MM AM/PM' format
 */
function formateTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    const time = new Date(date).toLocaleTimeString('en-GB', options);
    if(time === '00:00') {
        return '';
    }
    
    if(time > '12:00') {
        const [hour, minute] = time.split(':');
        const formattedHour = String(parseInt(hour) - 12).padStart(2, '0');
        if(formattedHour === '00') {
            return `12:${minute} PM`;
        }
        if(formattedHour.startsWith('0')) {
            return `${formattedHour.slice(1)}:${minute} PM`;
        }
        return `${formattedHour}:${minute} PM`;
    }

    return `${time} AM`;
}

export { getAgeDifference, formateDob, formateTime };