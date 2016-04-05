function romanize (num) {
  if (!+num)
    return false;
  var digits = String(+num).split(""),
    key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
      "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
      "","I","II","III","IV","V","VI","VII","VIII","IX"],
    roman = "",
    i = 3;
  while (i--)
    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};


addEventListener('DOMContentLoaded', function(){
  var _years = document.querySelectorAll('.year');
  for(var i=0;i<_years.length;i++)
    _years[i].textContent = romanize(new Date().getYear());

  var _colorway = document.getElementById('colorway');
  _colorway.onchange = updateImageDownload;
  var _format = document.getElementById('format');
  _format.onchange = updateImageDownload;
  var _img = document.querySelector('.imgfilename');
  var _imgDl = document.getElementById('imgdownload');

  function updateImageDownload() {
    var fn = "q42-logo" + _colorway.value + _format.value;
    _img.textContent = fn;
    _imgDl.href = fn;
  };

  updateImageDownload();
});
