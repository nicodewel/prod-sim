package de.volkswagen.productionbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ProductionBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductionBackendApplication.class, args);
	}

}