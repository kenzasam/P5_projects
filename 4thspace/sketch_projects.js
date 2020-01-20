//by Kenza Samlali, 2020
// PROJECT NAME: Alleles
// ABOUT: p5.js with search function for NCBI database, data visualisation.
// This script is written for a touchscreen
//
var dna;
var jrna=[];
var jdna=[];
var clrA='#91DFAA';
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
//var num=4;
//var mx=[];
//var my=[];
var input;
var jsonhere; //if this is true, means data got succesfully loaded. , then you can start shaping DNA fasta
var nucdatahere;
var startdrawing;
var apibase="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
var apikey="&api_key=67440c4bd547d9933874db2cfb7810390d08";
var fastafile;
var fastatitle;
/*
function preload(){
  largeunit = loadImage("largesubunit.png");
  //smallunit = loadImage("smallsubunit.tif");
}
*/
function setup() {
 canvas = createCanvas(windowWidth, windowHeight);
 canvas.position(0,0);
 canvas.style('z-index', '-1');
 canvas.style('display', 'block');
 smooth();
 f = textFont('Ariel',30,true); // courrier, 16 point, anti-aliasing on;
 //instructional text on top canvas
 info=textFont('Ariel',10);
 basetrail= new BaseTrail();
 basetrailrna = new BaseTrailrna();
 //detectribosome = new Startcodons();
 //actions when button is pressed, in index.html
 var button = select('#submit');
 button.mousePressed(eutilSearch);
 input=select('#nucleotide');
}
//
function draw() {
  background(51);
  fill(100);
  textFont(info);
  //text("Search for an organism, tissue, ... f.e. mus musculus!", 15, 80);
  //text("Move your mouse to draw DNA, click & drag to make RNA", 15, 100);
  //text("press SPACEBAR to clear canvas", 15, 140);

  if (startdrawing){
    //console.log('heloooooooo')
    fill(100);
    textFont(info);
    text("We found this: " +fastatitle, windowWidth-300, windowHeight-300);
    dnabase = jdna.charAt(i);
    rnabase = jrna.charAt(i);
    noFill();
    //DNA RNA drawing code
    if (touches.length==2){
      makeRNA=true;
      if (i == jdna.length){
          noLoop();
      }
      i = i+1;
    if (makeRNA){ //if RNA is TRUE , mouse is dragged...
      basetrail.update(dnabase);
      basetrail.show(dnabase);
      basetrailrna.update(rnabase);
      basetrailrna.show(rnabase);
      /*
      //if AUG detected in rna then I should display Ribosome.
      //Should also redraw the old ribosomes...
      if (startcodons.includes(i)==true){
        console.log('RIBOSOME');
        detectribosome.update();
        detectribosome.show();
      }
      else {
        console.log('boo');
      }
      */
    }else{ //just draw dna when mousemove (no dragging)
      basetrail.update(dnabase);
      basetrail.show(dnabase);
      basetrailrna.show(rnabase);
    }
  }
}
//
function eutilSearch(){
  //Esearch
  query = input.value()+"[orgn]";
  var searchurl=apibase+"esearch.fcgi?db=nucleotide&retmode=json&rettype=json&term="+query+apikey+"&usehistory=y";
  loadJSON(searchurl,gotSome);
  //console.log('ok');
}
//
function gotSome(data){
  console.log('Searching...');
  jsonhere=data;
  if (jsonhere){
    //var webenv=jsonhere.esearchresult.webenv;
    //var querykey=jsonhere.esearchresult.querykey;
    //var fetchurl=apibase+"efetch.fcgi?db=nucleotide&WebEnv="+webenv+"&query_key="+querykey+"&rettype=fasta&retmode=text&retmax=1"+apikey;
    var id=jsonhere.esearchresult.idlist[0];
    var fetchurl=apibase+"efetch.fcgi?db=nucleotide&id="+id+"&rettype=fasta&retmode=text"+apikey;
    //console.log(fetchurl)
    loadStrings(fetchurl,gotData);
  }
}

function gotData(fastafile){
  console.log('Found something! Fetching organism FASTA...');
  console.log(fastafile);
  nucdatahere=fastafile;
  if (nucdatahere){ // found something though NCBI, and thus startdrawing == TRUE
    fastatitle=fastafile[0];
    console.log('This is what I found:')
    console.log(fastatitle)
    var rawdna=fastafile.slice(1);
    jdna = join(rawdna,'');
    //console.log(jdna);
    //console.log(jdna.length);
    console.log('Converted into DNA.')
    //convert DNA string into RNA string
    var rna1=jdna.replace(/A/g,"U");
    var rna2=rna1.replace(/T/g,"A");
    var rna3=rna2.replace(/C/g,"F");
    var rna4=rna3.replace(/G/g,"C");
    jrna=rna4.replace(/F/g,"G");
    //console.log(jrna);
    //console.log(jrna.length);
    console.log('Converted into RNA.')
    //make a list of all startcodon position indices
    var idx = 0;
    for (idx = 0; (idx = jrna.indexOf("AUG", idx)) >= 0; idx++){
      startcodons.push(idx);
    }
    console.log('Found start codons at following positions...');
    console.log(startcodons);
    startdrawing=true;
    loop();
  }
}
//
//function touch(){
//  if (touches.length==2){
//    makeRNA=true;
//    if (i == jdna.length){
//        noLoop();
//    }
//    i = i+1;
  }
}
//
function touchMoved(){
  if (startdrawing){
    makeRNA=false;
    if (i == jdna.length){
      noLoop();
    }
    i = i+1;
  }
}
//
function keyPressed(){
  /*
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
  */
  if ((keyIsPressed == true) && (keyCode === ' ')){
    noLoop();
    background(255);
    i=0;
    basetrail.history=[];
    startdrawing=false;
  }
}
//
/*
function RibosomeBig(){
  //x=
  //y=
  image(largeunit,mouseX, mouseY-random(5,3));
}
//
function RibosomeSmall(){
  image(largeunit,mouseX, mouseY-4+random(-1,1));
}
*/
//
/*
function Startcodons(){
    this.historyRib=[];
    this.update = function(){
      this.x=mouseX;
      this.y=mouseY;
      var v=createVector(this.x,this.y);
      this.historyRib.push(v);
      console.log(this.historyRib);

      //for (var n=this.x.length-1;n>0;n--){ //store the x and y value in an array of 4
      //  this.x[n]=this.x[n-1];
      //  this.y[n]=this.y[n-1];
      //}
      //console.log(mx);
      //console.log(my);
    }
    this.show=function(){
      for (var n=0;n<this.historyRib.length;n++){
        var posrib = this.historyRib[i];
        fill(250);
        ellipse(posrib.x, posrib.y-random(5,3),15,25);
      }
    }
}
*/
//
function BaseTrail(){

  this.historyDNA=[];

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
    //f = textFont('Ariel',20,true);
    textFont(f);
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
//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
