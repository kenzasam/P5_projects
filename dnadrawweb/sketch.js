var dna ;
var jrna;
var jdna ;
var clr ;
var f ;
var i=0;
var clrA='#91DFAA' ;
var clrC='#5FACA3';
var clrT='#1E796F';
var clrG='#E35B96';
var clrRNA;
var base;
var baseRNA;
var canvas;
var makeRNA;
var startcodons=[];
var counter;

function preload(){
  dna = loadStrings('dna.txt', fileready);
}

function setup() {
  // put setup code here
 canvas = createCanvas(windowWidth, windowHeight);
 canvas.position(0,0);
 canvas.style('z-index', '-1')
 smooth();
 //ackground(255);
 f = textFont('Ariel',26,true); // courrier, 16 point, anti-aliasing on;
 //instructional text on top canvas
 info=textFont('Ariel',10);
 fill(200);
 textFont(info);
 text("press DEL to clear canvas", 15, 80);
 text("Click & Drag to make RNA", 15, 100);
 text("press ENTER to exit", 15, 60);
}
//
function fileready(dna){
  //"https://github.com/kenzasam/kenzascience/blob/gh-pages/dna.txt");
  jdna = join(dna,'');
  console.log(jdna);
  console.log(jdna.length);
  var rna1=jdna.replace(/A/g,"U");
  var rna2=rna1.replace(/T/g,"A");
  var rna3=rna2.replace(/C/g,"F");
  var rna4=rna3.replace(/G/g,"C");
  jrna=rna4.replace(/F/g,"G");
  console.log(jrna);
  console.log(jrna.length);
  var idx = 0;
  //console.log(jrna.indexOf("AUG"));
  for (idx = 0; (idx = jrna.indexOf("AUG", idx)) >= 0; idx++){
    startcodons.push(idx);
  }
  console.log(startcodons);
}
//
function draw() {
  //
  base = jdna.charAt(i);
  baseRNA = jrna.charAt(i);
  noFill();
  //DNA RNA drawing code
  if (makeRNA){ //if RNA is TRUE my mousedragged...
    textFont(f);
    basecolor(base);
    text(base,mouseX,mouseY);
    basecolor(baseRNA);
    text(baseRNA,mouseX,mouseY+17);
    //if (startcodon.includes(i)==true){
  //    mmm
  //  }//if AUG detected in rna then I should display Ribosomes
  }else{ //just draw dna when mousemoved
    textFont(f);
    basecolor(base);
    text(base,mouseX,mouseY);
  }
}
//
function basecolor(base){
  if (base =='G'){
      clr = clrG;}
  else if (base=='C'){
     clr = clrC;}
  else if (base=='A'){
     clr = clrA ;}
  else { // T or U
     clr = clrT;}
  fill(clr);
}
//
function mouseDragged(){
    //base = jdna.charAt(i);
    //noFill();
  makeRNA=true;
  console.log('i just made rna = true')
  if (i == jdna.length){
      noLoop();
  }
  i = i+1;
}
//
function mouseMoved(){
  makeRNA=false;
  console.log('i just made rna = false')
  if (i == jdna.length){
    noLoop();
  }
  i = i+1;
}
//
function keyPressed(){
  if ((keyIsPressed == true) && (keyCode === DELETE)){
      background(255);
      i=0;
      Loop();
  }
  if ((keyIsPressed == true) && (keyCode === ENTER | keyCode == RETURN)){
    noLoop();
    remove();
  }
}
