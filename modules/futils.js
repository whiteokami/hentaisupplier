function rhex() {
  var rhexstr = "";
  for(var i=0; i<6; i++) {
    if(Math.random() > 0.5) {
      //letter values
      var ranLET = Math.floor(Math.random() * 5);
      if(ranLET == 0) {
        rhexstr = rhexstr + "A";
      }
      if(ranLET == 1) {
        rhexstr = rhexstr + "B";
      }
      if(ranLET == 2) {
        rhexstr = rhexstr + "C";
      }
      if(ranLET == 3) {
        rhexstr = rhexstr + "D";
      }
      if(ranLET == 4) {
        rhexstr = rhexstr + "E";
      }
      if(ranLET == 5) {
        rhexstr = rhexstr + "F";
      }
    }else{
      rhexstr = rhexstr + Math.floor(Math.random() * 9);
    }
  }
  return rhexstr;
}

function cdate(mode) {
  var currentdate = new Date();
  var datetime = "";
  if(mode == 0){
    datetime = "[" + currentdate.getDate() + "." + (currentdate.getMonth()+1) + "." + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "]";
    return datetime;
  } else
  if(mode == 1) {
    datetime = "[" + currentdate.getDate() + "." + (currentdate.getMonth()+1) + "." + currentdate.getFullYear() + "]";
    return datetime;
  } else
  if(mode == 2) {
    datetime = "[" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "]";
    return datetime;
  } else {
    return "invalid parameter";
  }
}

module.exports = {rhex,cdate};
