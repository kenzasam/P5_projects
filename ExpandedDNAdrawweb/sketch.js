var dna ;
var jrna;
var jdna;
var clrA='#91DFAA' ;
var clrC='#5FACA3';
var clrT='#1E796F';
var clrG='#E35B96';
var clr ;
var f ;
var info;
var i=0;
var base;
var canvas;
var makeRNA;
var startcodons=[];
var counter;
var num=4;
var mx=[];
var my=[];
var apibase="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
var apikey="&api_key=67440c4bd547d9933874db2cfb7810390d08";
var input;
var nucdatahere; //if this is true, means data got
//succesfully loaded. , then you can start shaping DNA fasta

function preload(){
  dna = loadStrings('dna.txt', fileready);
  largeunit = loadImage("largesubunit.png");
  //smallunit = loadImage("smallsubunit.tif");
}
//
function setup() {
 canvas = createCanvas(windowWidth, windowHeight);
 canvas.position(0,0);
 canvas.style('z-index', '-1');
 smooth();
 //actions when button is pressed, in index.html
 var button = select('#submit');
 button.mousePressed(queryNucleotide);
 input=select('#nucleotide');
 //ackground(255);
 f = textFont('Ariel',20,true); // courrier, 16 point, anti-aliasing on;
 //instructional text on top canvas
 info=textFont('Ariel',10);
 fill(200);
 textFont(info);
 text("press DEL to clear canvas", 15, 80);
 text("Click & Drag to make RNA", 15, 100);
 text("press ENTER to exit", 15, 60);
 basetrail= new BaseTrail();
 basetrailrna = new BaseTrailrna();
}
//
function fileready(dna){
  //edit the incoming FASTA sequences to a string of bases (ACTG), no spaces, no text
  jdna = join(dna,'');
  console.log(jdna);
  console.log(jdna.length);
  //convert DNA string into RNA string
  var rna1=jdna.replace(/A/g,"U");
  var rna2=rna1.replace(/T/g,"A");
  var rna3=rna2.replace(/C/g,"F");
  var rna4=rna3.replace(/G/g,"C");
  jrna=rna4.replace(/F/g,"G");
  console.log(jrna);
  console.log(jrna.length);
  //make a list of all startcodon position indices
  var idx = 0;
  for (idx = 0; (idx = jrna.indexOf("AUG", idx)) >= 0; idx++){
    startcodons.push(idx);
  }
  console.log(startcodons);
}
//
function draw() {
  //
  background(255);
  dnabase = jdna.charAt(i);
  rnabase = jrna.charAt(i);
  noFill();
  //DNA RNA drawing code
  if (makeRNA){ //if RNA is TRUE my mousedragged...
    basetrail.update(dnabase);
    basetrail.show(dnabase);
    basetrailrna.update(rnabase);
    basetrailrna.show(rnabase);
    //if AUG detected in rna then I should display Ribosome.
    //Should also redraw the old ribosomes...
    if (startcodons.includes(i)==true){
      for (var n=mx.length-1;n>0;n--){ //store the x and y value in an array of 4
        mx[n]=mx[n-1];
        my[n]=my[n-1];
      }
      mx[0]=mouseX;
      my[0]=mouseY;
      //console.log(mx);
      //console.log(my);
      for (var n=0;n<mx.length;n++){
        fill(250);
        ellipse(mx[n], my[n]-random(5,3),15,25);
      }
    }
  }else{ //just draw dna when mousemove
    basetrail.update(dnabase);
    basetrail.show(dnabase);
    basetrailrna.show(rnabase);
  }

}
//
function queryNucleotide(){
  var url=apibase+"efetch.fcgi?db=nucleotide&rettype=fasta&id="+input.value()+apikey;
  //console.log(url)
  fastadna=loadStrings(url,gotData);
  console.log(fastadna);
}
//
function gotData(data){
  swuldna = join(fastadna,'');
  console.log(shwuldna);
  println(data);
  nucdatahere=data;
}
//
function RibosomeBig(){

  //x=
  //y=
  image(largeunit,mouseX, mouseY-random(5,3));
}
//
function RibosomeSmall(){
  image(largeunit,mouseX, mouseY-4+random(-1,1));
}
//
function mouseDragged(){
    //base = jdna.charAt(i);
    //noFill();
  makeRNA=true;
  //console.log('makerna = true')
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
  if ((keyIsPressed == true) && (keyCode === DELETE|keyCode === BACKSPACE)){
      background(255);
      i=0;
      basetrail.history=[];
      Loop();
  }
  if ((keyIsPressed == true) && (keyCode === ENTER | keyCode == RETURN)){
    noLoop();
    remove();
  }
}

function Startcodons(){
  if (startcodons.includes(i)==true){
    this.x=[];
    this.y=[];

    this.update = function(){
      for (var n=this.x.length-1;n>0;n--){ //store the x and y value in an array of 4
        this.x[n]=this.x[n-1];
        this.y[n]=this.y[n-1];
      }
      this.x[0]=mouseX;
      this.y[0]=mouseY;
      //console.log(mx);
      //console.log(my);
    }
    this.show=function(){
      for (var n=0;n<this.x.length;n++){
        fill(250);
        ellipse(this.x[n], this.y[n]-random(5,3),15,25);
      }
    }

  }
}

function BaseTrail(){
  //this.x=mouseX;
  //this.y=mouseY;
  //this.base=base;
  this.historyDNA=[];
  //this.type=type;

  this.update=function(base){
    this.base = base;
    this.color = this.basecolor(this.base);
    this.x=mouseX;
    this.y=mouseY;
    console.log('its a baseeeeee')
    var v={x:this.x , y:this.y, base:this.base , clr:this.color};
    this.historyDNA.push(v);
    //console.log(this.history);
  }

  this.show = function(base){
    this.base= base;
    //this.x=mouseX;
    //this.y=mouseY;
    //f = textFont('Ariel',20,true);
    textFont(f);
    //this.basecolor(this.base);
    //console.log('okay2');
    //text(this.base,this.x,this.y);
    //console.log(this.base);
    //console.log(this.x);
    nanana=this.historyDNA;
    for (var i=0;i<nanana.length;i++){
      var pos = nanana[i];
      fill(pos.clr);
      text(pos.base,pos.x,pos.y);
      //console.log(pos.base)
      //console.log(pos.x)
      //console.log(pos.y)
    }
  }

  this.basecolor=function(base){
    this.base=base;
    //console.log('pewpew');
    if (this.base =='G'){
        clr = clrG;}
    else if (this.base=='C'){
       clr = clrC;}
    else if (this.base=='A'){
       clr = clrA ;}
    else { // T or U
       clr = clrT;}
    return clr;
    //console.log('puuewpew');
  }
}
//
function BaseTrailrna(){
  this.historyRNA=[];

  this.update=function(base){
    this.base = base;
    this.color = basetrail.basecolor(this.base);
    this.x=mouseX;
    this.y=mouseY-12;
    //console.log('its an rna baseeeeee')
    var v={x:this.x , y:this.y, base:this.base , clr:this.color};
    this.historyRNA.push(v);
  }
    //console.log(this.historyRNA);

  this.show = function(base){
    this.base= base;
    textFont(f);
    nanana=this.historyRNA;
    for (var i=0;i<nanana.length;i++){
      var pos = nanana[i];
      fill(pos.clr);
      text(pos.base,pos.x,pos.y);
      //console.log(pos.base)
      //console.log(pos.x)
      //console.log(pos.y)
    }
  }
}
