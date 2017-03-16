function DNA(l)
{
  this.dna = [];
  this.fitness = 0;


  for (var i = 0; i < l; i++) {
    this.dna[i] = String.fromCharCode(Math.floor(Math.random()*94) + 32) //picks random number from 32 to 126 and converts it to string
  }
  this.getPhrase = function(){
    return this.dna.join("");
  }
  this.calcFitness = function(target) {
    var score = 0;
    for(var i = 0; i < this.dna.length; i++)
    {
      if(this.dna[i] == target.charAt(i))
      {
        score++;
      }
    }
    this.fitness = score / target.length;
  }

  this.crossover = function(partner){
    var child = new DNA(this.dna.length);
    var midpoint = Math.floor(Math.random()*this.dna.length);

    for (var i = 0; i < this.dna.length; i++) {
      if (i > midpoint) child.dna[i] = this.dna[i];
      else              child.dna[i] = partner.dna[i];
    }
    return child;

  }
  this.mutate = function(mutationRate) {
    for (var i = 0; i < this.dna.length; i++) {
      if (Math.random(1) < mutationRate) {
        this.dna[i] = String.fromCharCode(Math.floor(Math.random()*94) + 32);
      }
    }
  }
}
