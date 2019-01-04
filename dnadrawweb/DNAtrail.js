//
base = jdna.charAt(i);
baseRNA = jrna.charAt(i);
noFill();
//DNA RNA drawing code
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
