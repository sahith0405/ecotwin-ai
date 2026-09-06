package com.ecotwin.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcoTwinBackendApplication {

	public static void main(String[] args) {
		String datasourceUrl = System.getenv("SPRING_DATASOURCE_URL");
		if (datasourceUrl != null && datasourceUrl.startsWith("postgresql://")) {
			System.setProperty("spring.datasource.url", "jdbc:" + datasourceUrl);
		}

		SpringApplication.run(EcoTwinBackendApplication.class, args);
	}

}
