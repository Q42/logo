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
}

function updateImageDownload() {
  var fn = "q42-logo" + $("#colorway").val() + $("#format").val();
  $(".imgfilename").text(fn);
  $("#imgdownload").attr('href', fn);
}

$(document).ready(function(){
  $(".year").text(romanize(new Date().getYear()));
  updateImageDownload();
});

$(document).on('change', '#colorway', function() {
  updateImageDownload();
});

$(document).on('change', '#format', function() {
  updateImageDownload();
});
