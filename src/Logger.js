module.exports = isVerbose => (err, msg) => {
  if (err) return console.error(isVerbose ? err : err.message || err);
  msg && console.log(msg);
}
