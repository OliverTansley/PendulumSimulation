//Oliver Tansley Pendulum Simualation
//Pendulum updates every 1/60 of a second which is reffered to as 1 Tick 
//Pendulum movement is calculated using an angular velocity approach in radial mode

//---GLOBAL SCOPE---//
var PI = 3.14159;
var P;
var DegAngle = 7;	//Inputted
var angle = (DegAngle/360)*(2*PI);	
var delta_time = 1/60;
var Scale = 15;
var time = 0;
var gravity = 9.81;	//Inputted
var Toggle = 'True';
var e = 2.71;
var Question = [];
var answer;

//creates Pendulum object as P
P = new Pendulum();

//creates canvas environment for simulation
function setup(){
	createCanvas(400,400);
}

function draw(){
	
	//Tests whether the simulation is paused
	if(Toggle == 'True'){
		
		//Places background over previously drawn pendulumn
		background("white");
		
		//increments the elapsed time of the simulation by the delta time
		time += delta_time;
		
		//Pendulum methods being called
		P.update();
		P.show();	
		
	}
	
	//Calls the function to display all the newly calculated values
	Outputpanel_update();
	
}

function Pendulum(){
	
		//---CONSTANT ATTRIBUTES---//
		
		this.length = 10;	//Inputted
		this.mass = 10;	//Inputted
		this.A0 = angle*this.length;
		this.timePeriod = 2*PI*(this.length/gravity)**0.5;
		this.angularVel = 2*PI/this.timePeriod;

	//draws sketch of pendulumn
	this.show = function(){
		
		//draws the string of the pendulumn
		strokeWeight(0.5*Scale);
		fill("red");
		line(200,50,200+ Scale*this.x,50 - Scale*this.y);
		
		//draws peg of the pendulumn
		strokeWeight(1);
		fill(1);
		fill("red");
		ellipse(200,50,3*Scale,3*Scale);
		
		//draws the mass on the end of the pendulumn
		fill("yellow");
		ellipse(200 + Scale*(this.x), 50 - Scale*(this.y),Scale*this.mass*0.5,Scale*this.mass*0.5);
	
	}
	
	//updates non constant attributes of the pendulumn as it moves
	this.update = function(){
		
		//---VARIABLE ATTRIBUTES---//
		this.amplitude = this.A0*(e**(-time/10));
		this.velocity = -(this.amplitude)*this.angularVel*Math.sin(this.angularVel*time);
		this.KE = 0.5*this.mass*(this.velocity)**2;
		this.height =(this.length) + (this.y); 
		this.GPE = eval(this.height)*gravity*this.mass;
		
		//Finds the change in displacement for 1 Tick
		CurrentDisplacement = this.amplitude*Math.cos(this.angularVel*time);
		
		this.acceleration = -CurrentDisplacement*(this.angularVel)**2; //--VARIABLE ATTRIBUTE
		
		NextDisplacement = this.amplitude*Math.cos(this.angularVel*(time + 1/60));
		displacementChange = NextDisplacement - CurrentDisplacement;
		
		//updates angle to create movement
		angle += (displacementChange/this.length);

		//updates x and y so the pendulum can be redrawn at the new position
		this.x = this.length*sin(angle + PI);
		this.y = this.length*cos(angle + PI);

	}	
}

//Toggles the value of the Toggle variable allowing the user to pause the simulation
function ToggleSim(){
	
	if(Toggle == 'True'){
		Toggle = 'False';
	}else if(Toggle == 'False'){
		Toggle = 'True';
	}
}

//Displays values of pendulum attributes onto the screen
function Outputpanel_update(){
	//Displays Velocity
	document.getElementById("VelocityLBL").innerHTML = "Velocity:" + (P.velocity.toString()).substring(0,5);
	//Displays Kinetic energy
	document.getElementById("KELBL").innerHTML = "Kinetic Energy:" + (P.KE.toString()).substring(0,5);
	//Displays displays GPE
	document.getElementById("GPELBL").innerHTML = "Gravitational Energy:" + (P.GPE.toString()).substring(0,7);
	//Displays Acceleration
	document.getElementById("AccelerationLBL").innerHTML = "Acceleration:" + (P.acceleration.toString()).substring(0,5);
}

//Takes values of input feilds
function Take_Input(){
	
	InputCount = 0;
	if(document.getElementById("AngleTextFeild").value != ""){
		InputCount ++;
	}
	if(document.getElementById("LengthTextFeild").value != ""){
		InputCount ++;
	}
	if(document.getElementById("MassTextFeild").value != ""){
		InputCount ++;
	}
	if(document.getElementById("GravTextFeild").value != ""){
		InputCount ++;
	}
	if(InputCount <= 2){
		
		//Takes input for the angle and converts it from degrees to Radians
		if(parseInt(document.getElementById("AngleTextFeild").value) < 8 && parseInt(document.getElementById("AngleTextFeild").value) >= 0){
			DegAngle = document.getElementById("AngleTextFeild").value;
			angle = (DegAngle/360)*(2*PI);
		}else{
			document.getElementById("AngleTextFeild").placeholder = "Must be a number between 0 and 7";
			document.getElementById("AngleTextFeild").value  = "";
		}
		//Takes input for the length
		if(parseInt(document.getElementById("LengthTextFeild").value) < 31 && parseInt(document.getElementById("LengthTextFeild").value) > 0){
			P.length = document.getElementById("LengthTextFeild").value;
			parseInt(P.length , 10);
		}else{
			document.getElementById("LengthTextFeild").placeholder  = "Must be a number between 0 and 30";
			document.getElementById("LengthTextFeild").value  = "";
		}
		//Takes input for the mass
		if(parseInt(document.getElementById("MassTextFeild").value) < 31 && parseInt(document.getElementById("MassTextFeild").value) > 0){
			P.mass = document.getElementById("MassTextFeild").value;
		}else{
			document.getElementById("MassTextFeild").placeholder = "Must be a number between 0 and 30";
			document.getElementById("MassTextFeild").value  = "";
		}
		//Takes input for the gravity
		if(parseInt(document.getElementById("GravTextFeild").value) < 11 && parseInt(document.getElementById("GravTextFeild").value) > 0){
			gravity = document.getElementById("GravTextFeild").value;
		}else{
			document.getElementById("GravTextFeild").placeholder = "Must be a number between 0 and 10";
			document.getElementById("GravTextFeild").value  = "";
		}
		
		//--CONSTANT ATTRIBUTES---// Recalculated for new input
		P.amplitude = angle*P.length;
		P.A0 = P.amplitude;
		P.timePeriod = 2*PI*(P.length/gravity)**0.5;
		P.angularVel = 2*PI/P.timePeriod;

		//Restarts the simulation from the begining
		time = 0;
		Toggle = 'True';
	}
	else{
		document.getElementById("InputTitle").innerHTML = "Only change 2 values<h3>Mass:</h3>";
	}
}

//Graphs Energy conversion against time
function Energy_graph(){
	
	var rate = 20;
	var k = 300;
	var cnt = 0;
	
	//Getter functions that pass the value of the Kinetic and gravitational energy to the graph
	function getKE(){
		return P.KE;
	}
	function getGPE(){
		return (P.GPE);
	}

	//Plots the two lines onto the graph
	Plotly.plot("EnergyChart",[{ y:[getKE()],type:"line"}],[0]);
	Plotly.plot("EnergyChart",[{ y:[getGPE()],type:"line"}],[1]);
	
	//Changes the range of the graph relavive to the time
	setInterval( function() {
	
		if(cnt%rate == 0){
			Plotly.extendTraces("EnergyChart", { y:[[P.KE]]}, [0]);
			Plotly.extendTraces("EnergyChart", { y:[[P.GPE]]}, [1]);

			if(cnt > k){
				//Changes the x values based on the range and value of K
				Plotly.relayout("EnergyChart",{	xaxis: {range:[(cnt-k)/rate,(cnt)/rate]} });
			}
		}
		cnt+=1;	
	},20);
}
//Graphs Velocity Against time
function Velocity_graph(){
	
	var rate = 20;
	var k = 300;
	var cnt = 0;
	
	//Getter function to pass the velocity to the graph
	function getVel(){
		return parseInt(P.velocity);
	}
	
	//Plots the line of velocity onto the graph
	Plotly.plot("VelocityChart",[{ y:[getVel()],type:"line"}],[0]);
	
	//changes the range of the graph relative to the time
	setInterval( function() {
		
		if(cnt%rate == 0){
			Plotly.extendTraces("VelocityChart", { y:[[P.velocity]]}, [0]);

			if(cnt > k) {
				//Changes the x values based on the range and value of K
				Plotly.relayout("VelocityChart",{ xaxis: {range:[(cnt-k)/rate,(cnt)/rate]} });
			}
		}
		cnt+=1;	
	},20);
}

//Function to easily format strings
String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k])
  }
  return a
}

function Practice_start(){
	
	//Hides solution to previous question
	document.getElementById("solution line1").hidden = true;
	document.getElementById("solution line2").hidden = true;

	//Populates the array with variables required for the question
	Question[0] = Math.floor(Math.random()*20 +1);	//Length
	Question[1] = Math.floor(Math.random()*10 +1);	//Gravity
	Question[2] = 2*PI*Math.sqrt(Question[0]/Question[1]);	//Time Period
	Question[3] = 'A pendulum has length {0} and gravity is {1} what is the time period?';
		
	//displays the question onto the webpage
	document.getElementById("TheQuestion").innerHTML = Question[3].format(Question[0],Question[1]);
	
} 

function QuestionTest(){
	
	//Formats the question so that the decimal point is removed if it is at the end of the string
	answer = eval(Question[2].toPrecision(3));

	//Tests if the answer given is correct and displays appropriate message
	if((document.getElementById("QuestionTextFeild").value.length != answer.toString().length)){
		document.getElementById("TheQuestion").innerHTML += "Please answer to three significant figures"
	}
	else if((document.getElementById("QuestionTextFeild").value) == answer){
		
		document.getElementById("TheQuestion").innerHTML = "Correct!";
		
	}else{
		document.getElementById("TheQuestion").innerHTML = "Incorrect!";
		Generate_Solution();
	}
}

//Function that shows the solution to the question that has been generated
function Generate_Solution(){
	
	document.getElementById("solution line1").hidden = false;
	document.getElementById("solution line2").hidden = false;
	document.getElementById("solution line2").innerHTML = "G = {0} and L = {1}".format(Question[1],Question[0]);
}

//Calls Graphing functions when the webpage loads
Energy_graph();
Velocity_graph();

//Hides solution Element so the user has the option to view it if they need
document.getElementById("solution line1").hidden = true