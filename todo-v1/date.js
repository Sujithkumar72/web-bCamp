
const today = new Date();
exports.getFullDay = function() {

  const dateSettings = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }
  let dayFull = today.toLocaleDateString("en-IN", dateSettings);

  return dayFull;
}

exports.getDayOnly =function() {
  const daySettings = {
    weekday: "long",

  }
  let dayOnly = today.toLocaleDateString("en-IN", daySettings);
  return dayOnly;
}

console.log(module.exports);
