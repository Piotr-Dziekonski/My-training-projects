package algorithm;



public class SimpleGeneticAlgorithm {
    public static void main(String[] args) throws InterruptedException {

    	SimpleGeneticAlgorithm.runAlgorithm(150,"11111");//(sizeOfPopulation, targetPhrase)
    	

    }
    public static void runAlgorithm(int popSize, String target){
    	Population myPop = new Population(popSize, target);  //create a population


        while(myPop.finished == false){

            myPop.naturalSelection();   // calculate fitness of population and add individuals to mating pool
            myPop.createNextGen();  // create new generation using the mating pool
            myPop.calcFitnessOfIndividuals();// calculate fitness of every individual in the new population
            myPop.evaluate();   // check if we are done


            System.out.println(
                     "Generation: " + myPop.generationCount
                             + " Best match: " + myPop.getFittestAsString()
                             + " Best fitness: " + myPop.getFittest().getFitness());


            if(myPop.generationCount > 8000) break; //in case it took too long
         }
    }



}
