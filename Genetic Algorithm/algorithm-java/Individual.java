package algorithm;

import java.util.*;

public class Individual {
    private String dna;
    private double fitness;

    public Individual(int targetLength) {

        fitness = 0;
        dna = "";

        for (int i = 0; i < targetLength; i++) {
            char c = (char)((int) (Math.floor(Math.random()*94) + 32));

            dna += c;

        }
    }

    public void calculateFitness(String target) {
        int correctChars = 0;
        char[] t = target.toCharArray();
        char[] d = dna.toCharArray();
        for (int i = 0; i < target.length(); i++) {
            if(t[i] == d[i]){
                correctChars++;
            }
        }
        fitness = (double)(correctChars) / ((double)target.length());
        //fitness = Math.pow(fitness, 8); // you can uncomment this to improve speed of the program but then display of best fitness needs improving
    }
    public double getFitness() {
        return fitness;
    }

    public String getDna() {
        return dna;
    }
    public void setDna(String d) {
        dna = d;
    }

    public Individual crossover(Individual partnerB) {
        Individual child = new Individual(dna.length());
        Random random = new Random();
        char[] childChars = child.dna.toCharArray();
        int midpoint = random.nextInt(dna.length());

        for (int i = 0; i < dna.length(); i++) {
            if (i > midpoint) {

                childChars[i] = dna.toCharArray()[i];
            }
            else {
                childChars[i] = partnerB.dna.toCharArray()[i];
            }
        }
        child.setDna(String.valueOf(childChars));
        return child;
    }

    public void mutate(double mutationRate) {
        for (int i = 0; i < dna.length(); i++) {
            if (Math.random() < mutationRate) {
                char c = (char)((int) (Math.floor(Math.random()*94) + 32));
                char[] dnaAsChars = dna.toCharArray();
                dnaAsChars[i] = c;
                dna = String.valueOf(dnaAsChars);
            }
        }
    }
}
