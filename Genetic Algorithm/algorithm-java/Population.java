package algorithm;

import java.util.ArrayList;
import java.util.Random;

public class Population {
    private int populationSize;
    private double bestFitness;
    private double targetFitness;
    private Individual fittest;
    private ArrayList<Individual> population;
    private ArrayList<Individual> matingPool;
    private String target;
    public int generationCount;
    private double mutationRate;
    boolean finished;
    //private String fittestAsString;

    public Population(int popSize, String target_) {

        populationSize = popSize;
        target = target_;
        targetFitness = 1;
        population  = new ArrayList<>();
        bestFitness = 0;
        mutationRate = 0.1;
        finished = false;

        for (int i = 0; i < popSize; i++) {
            Individual individual = new Individual(target.length());
            population.add(individual);
        }

    }

    public Individual getFittest() {
        updateFittest();
        return fittest;
    }

    public void updateFittest(){
        for (Individual i : population) {
            if(i.getFitness() >= bestFitness){
                bestFitness = i.getFitness();
                fittest = i;
            }
        }
    }

    public double getTargetFitness() {
        return targetFitness;
    }

    public int getPopulationSize() {
        return populationSize;
    }

    public String getFittestAsString() {
        updateFittest();
        String fittestAsString = fittest.getDna();
        return fittestAsString;
    }

    public void calcFitnessOfIndividuals() {
        for (Individual i : population) {
            i.calculateFitness(target);
        }
    }
    static public final double map(double value,
                                   double istart,
                                   double istop,
                                   double ostart,
                                   double ostop) {
        return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    }

    public void naturalSelection() {
        updateFittest();
        matingPool = new ArrayList<>();
        for (int i = 0; i < populationSize; i++) {
            double fitness = map(population.get(i).getFitness(), 0, fittest.getFitness(), 0, 1);
            int n = (int) (fitness * 100);
            if(n == 0)
            {
                n = 1;
            }
            for (int j = 0; j < n; j++) {
                matingPool.add(population.get(i));
            }
        }
    }

    public void createNextGen() {
        for (int i = 0; i < populationSize; i++) {
            Random random = new Random();
            int a = random.nextInt(matingPool.size());
            int b = random.nextInt(matingPool.size());
            Individual partnerA = matingPool.get(a);
            Individual partnerB = matingPool.get(b);
            Individual child = partnerA.crossover(partnerB);
            child.mutate(mutationRate);
            population.set(i, child);
        }
        generationCount++;
    }

    public void evaluate(){
        updateFittest();
        if (fittest.getFitness() == targetFitness){
            finished = true;
        }
    }
}
