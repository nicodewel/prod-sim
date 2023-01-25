package de.volkswagen.productionbackend.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
}