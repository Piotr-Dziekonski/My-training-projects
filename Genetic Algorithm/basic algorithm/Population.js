function Population(t, p, mR)
{
  this.population
  this.maxPopulation = p;
  this.target = t;
  this.mutationRate = mR;
  this.matingPool;
  this.generations = 0;
  this.finished = false;
  this.perfectScore = 1;
  this.best = "";

  this.population = [];

  for(var i = 0; i < p; i++)
  {
    this.population[i] = new DNA(this.target.length);
  }

  this.calcFitness = function(){
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }
  this.calcFitness();
	
  this.getBest = function(){
    var bestFit = 0;
    var indexOfBest = 0;
    for (var i = 0; i < this.population.length; i++) {
      if(this.population[i].fitness > bestFit)
      {
        bestFit = this.population[i].fitness;
        indexOfBest = i;
      }
    }
    this.best = this.population[indexOfBest].getPhrase();
    return this.best;
  }

  this.naturalSelection = function(){
    this.matingPool = [];
    var bestFit = 0;
    for (var i = 0; i < this.population.length; i++) {
      //console.log(this.population[i].fitness);
      if(this.population[i].fitness > bestFit)
      {
        bestFit = this.population[i].fitness;
      }
    }

    for (var i = 0; i < this.population.length; i++) {
      map = function(number, in_min, in_max, out_min, out_max){
         return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      }
      var fitness = map(this.population[i].fitness, 0, bestFit, 0, 1);
      var n = Math.floor(fitness*100);

      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }
  this.getMatingPool = function(){
    return this.matingPool;
  }
  this.getPopulation = function(){
    return this.maxPopulation;
  }
  this.generate = function(){
    for (var i = 0; i < this.population.length; i++) {

      var a = Math.floor(Math.random() * this.matingPool.length);
      //console.log(a);
      var b = Math.floor(Math.random() * this.matingPool.length);
    //  console.log(b);
      var partnerA = this.matingPool[a];
    //  console.log(this.matingPool[a]);
      var partnerB = this.matingPool[b];
      var child = partnerA.crossover(partnerB); //todo
      child.mutate(this.mutationRate);//todo
      this.population[i] = child;
    }
    this.generations++;
  }

  this.isFinished = function() {
    return this.finished;
  }

  this.getGeneration = function(){
    return this.generations;
  }

  this.evaluate = function() {
    var worldrecord = 0.0;
    var index = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index].getPhrase();
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }
  this.getAverageFitness = function() {
    var total = 0;
    for (var i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

}
