
function getAgeDifference(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let ageDiff = today - birthDate;

  // Convert milliseconds to years
  const age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  return age;
}

function formateDob(dob) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dob).toLocaleDateString('en-CA', options);
}

export { getAgeDifference, formateDob };