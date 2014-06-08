jQuery.fn.countdown = function(userOptions)
{
  var today = new Date();
  var weddingDay = new Date();
  
  function getDays(){
  	weddingDay.setMonth(9, 4);
  	weddingDay.setYear(2014);
  	weddingDay.setHours(17,30,0);
  	var dif = weddingDay.getTime() - today.getTime();
  	var difmil = Math.floor(dif / (1000));
  	var sec = difmil % 60;
  	var minTot = Math.floor(difmil / 60);
  	var min = minTot % 60;
  	var hTot = Math.floor(minTot / 60);
  	var h = hTot % 24;
  	var days = Math.floor(hTot / 24);
  	var hString = h;
  	if (h < 10) hString = '0' + h;
  	var mString = min;
  	if (min < 10) mString = '0' + min;
  	var sString = sec;
  	if (sec < 10) sString = '0' + sec;
  	return days + ':' + hString + ':' + mString + ':' + sString;
  }
  // Default options
  var options = {
    stepTime: 60,
    // startTime and format MUST follow the same format.
    // also you cannot specify a format unordered (e.g. hh:ss:mm is wrong)
    format: "ddd:hh:mm:ss",
    startTime: getDays(),
    digitImages: 6,
    digitWidth: 53,
    digitHeight: 77,
    timerEnd: function(){},
    image: "assets/img/digits.png"
  };
  var digits = [], interval;

  // Draw digits in given container
  var createDigits = function(where) 
  {
    var c = 0;
    // Iterate each startTime digit, if it is not a digit
    // we'll asume that it's a separator
    for (var i = 0; i < options.startTime.length; i++)
    {
      if (parseInt(options.startTime[i]) >= 0) 
      {
        elem = $('<div id="cnt_' + i + '" class="cntDigit" />').css({
          height: options.digitHeight * options.digitImages * 10, 
          float: 'left', background: 'url(\'' + options.image + '\')',
          width: options.digitWidth});
        digits.push(elem);
        margin(c, -((parseInt(options.startTime[i]) * options.digitHeight *
                              options.digitImages)));
        digits[c].__max = 9;
        // Add max digits, for example, first digit of minutes (mm) has 
        // a max of 5. Conditional max is used when the left digit has reach
        // the max. For example second "hours" digit has a conditional max of 4 
        switch (options.format[i]) {
          case 'h':
            digits[c].__max = (':' == options.format[i-1]) ? 2: 9;
            if (':' == options.format[i-1] == 0)
              digits[c].__condmax = 4;
            break;
          case 'd':
            digits[c].__max = 9;
            break;
          case 'm':
          case 's':
            digits[c].__max = (':' == options.format[i-1]) ? 5: 9;
        }
        ++c;
      }
      else 
        elem = $('<div class="cntSeparator"/>').css({float: 'left'})
                .text(options.startTime[i]);

      where.append(elem)
    }
  };
  
  // Set or get element margin
  var margin = function(elem, val) 
  {
    if (val !== undefined)
      return digits[elem].css({'marginTop': val + 'px'});

    return parseInt(digits[elem].css('marginTop').replace('px', ''));
  };

  // Makes the movement. This is done by "digitImages" steps.
  var moveStep = function(elem) 
  {
    digits[elem]._digitInitial = -(digits[elem].__max * options.digitHeight * options.digitImages);
    return function _move() {
      mtop = margin(elem) + options.digitHeight;
      if (mtop == options.digitHeight) {
        margin(elem, digits[elem]._digitInitial);
        if (elem > 0) moveStep(elem - 1)();
        else 
        {
          clearInterval(interval);
          for (var i=0; i < digits.length; i++) margin(i, 0);
          options.timerEnd();
          return;
        }
        if ((elem > 0) && (digits[elem].__condmax !== undefined) && 
            (digits[elem - 1]._digitInitial == margin(elem - 1)))
          margin(elem, -(digits[elem].__condmax * options.digitHeight * options.digitImages));
        return;
      }

      margin(elem, mtop);
      if (margin(elem) / options.digitHeight % options.digitImages != 0)
        setTimeout(_move, options.stepTime);

      if (mtop == 0) digits[elem].__ismax = true;
    }
  };

  $.extend(options, userOptions);
  this.css({height: options.digitHeight, overflow: 'hidden'});
  createDigits(this);
  interval = setInterval(moveStep(digits.length - 1), 1000);
};