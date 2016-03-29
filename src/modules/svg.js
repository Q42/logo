// Render logo as SVG element
Q42Logo['SVG'] = function(logo){
  this.logo = logo;
};

Q42Logo['SVG'].prototype = {
  init: function(){
    console.log('Init SVG!', this.logo);
  }
}
