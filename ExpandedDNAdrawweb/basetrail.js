//https://www.youtube.com/watch?v=vqE8DMfOajk
var clrA='#91DFAA' ;
var clrC='#5FACA3';
var clrT='#1E796F';
var clrG='#E35B96';
var clr ;
var f ;
//DNA RNA drawing code
function BaseTrail(base,x,y){
  this.x=x;
  this.y=y;
  this.base=base;
  this.history=[];

  this.update=function(base){
    this.x+=mouseX
    this.y+=mouseY
    this.base = base
    var v=createVector(base,this.x,this.);
    this.history.push(v);
  }

  this.show = function(){
    f = textFont('Ariel',26,true);
    textFont(f);
    Basecolor(this.base);
    text(this.base,this.x,this.y);
    for (var i=0;i<this.history.length;i++){
      var pos = this.history[i];
      text(base,pos.x,pos.y);
    }
  }
  this.basecolor=function(){
    if (this.base =='G'){
        clr = clrG;}
    else if (this.base=='C'){
       clr = clrC;}
    else if (this.base=='A'){
       clr = clrA ;}
    else { // T or U
       clr = clrT;}
    fill(clr);
  }
}

if (makeRNA){ //if RNA is TRUE my mousedragged...
  textFont(f);
  Basecolor(base);
  text(base,mouseX,mouseY);
  Basecolor(baseRNA);
  text(baseRNA,mouseX,mouseY+17);
  if (startcodons.includes(i)==true){
    for (var n=mx.length-1;n>0;n--){ //store the x and y value in an array of 4
      mx[n]=mx[n-1];
      my[n]=my[n-1];
    }
    mx[0]=mouseX;
    my[0]=mouseY;
    console.log(mx);
    console.log(my);
  }
  for (var n=0;n<mx.length;n++){
    ellipse(mx[n], my[n]-random(5,3),25,35);
  }
    //ellipse(mouseX, mouseY-random(5,3),25,35);

}else{ //just draw dna when mousemoved
  textFont(f);
  Basecolor(base);
  text(base,mouseX,mouseY);
  for (var n=0;n<mx.length;n++){
    ellipse(mx[n], my[n]-random(5,3),25,35);
  }
}//if AUG detected in rna then I should display Ribosomes. Bt I should also redraw the old ribosomes...
}
