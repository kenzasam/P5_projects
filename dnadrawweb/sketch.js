var dna ;
var rna;
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
  var rna1=jdna.replace(/A/,"U")
  var rna2=rna1.replace(/T/,"A")
  var rna3=rna2.replace(/C/,"G")
  rna=rna3.replace(/G/,"C")
}
//
function draw() {
  //
  base = jdna.charAt(i);
  noFill();
  //DNA RNA drawing code
  if (makeRNA){ //if RNA is TRUE my mousedragged...
    if (base =='G'){
        baseRNA ='C';
        clrRNA = clrC;
        clr = clrG;}
    else if (base=='C'){
       baseRNA ='G';
       clrRNA = clrG;
       clr = clrC;}
    else if (base=='A'){
       baseRNA ='U';
       clrRNA = clrT;
       clr = clrA ;}
    else {
       baseRNA ='A';
       clrRNA = clrA;
       clr = clrT;}
    textFont(f);
    fill(clr);
    text(base,mouseX,mouseY);
    fill(clrRNA);
    text(baseRNA,mouseX,mouseY+20);
    //if AUG detected in rna then I should display Ribosomes
  }else{ //just draw dna when mousemoved
    if (base =='G'){
        clr = clrG;}
    else if (base=='C'){
       clr = clrC;}
    else if (base=='A'){
       clr = clrA ;}
    else {
       clr = clrT;}
    textFont(f);
    fill(clr);
    text(base,mouseX,mouseY);
  }
}
//
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
