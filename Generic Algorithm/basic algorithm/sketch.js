var target;
var popmax;
var mutationRate;
var population;

function setup()
{


  bestPhrase = document.createElement('p');
  avgFitness = document.createElement('p');
  population = document.createElement('p');
  inputmsg = document.createElement('input');
  button = document.createElement('button');
  document.body.appendChild(bestPhrase).className = "bestPhrase";
  document.body.appendChild(avgFitness).className = "avgFitness";
  document.body.appendChild(population).className = "population";
  document.body.appendChild(inputmsg).className = "inputmsg";
  document.body.appendChild(button).className = "button";
  button.innerHTML = "Evolve";
  bestPhrase.innerHTML = "Best phrase: ";
  avgFitness.innerHTML = "Average fitness: ";

  inputmsg.value = "test";

  button.onclick = function(){
    target = inputmsg.value;
    population.finished = false;
    population = new Population(target, popmax, mutationRate);
    draw();
  }
  target = "Type and click the button.";
  popmax = 150;
  mutationRate = 0.01;

  population.innerHTML = "Population: " + popmax;

  population = new Population(target, popmax, mutationRate);
  draw();
}

function draw()
{
    d = new Date();
    var inter = setInterval(function(){

      population.naturalSelection();

      population.generate();

      population.calcFitness();

      population.evaluate();

      displayInfo();


    if (population.isFinished()) {
      //println(millis()/1000.0);
      clearInterval(inter);
    }
  },1);

}
function displayInfo()
{

    var answer = population.getBest();
    bestPhrase.innerHTML = "Best phrase: " + answer;
    avgFitness.innerHTML = "Average fitness: " + population.getAverageFitness();

}
