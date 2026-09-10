package com.ecotwin.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URI;

@SpringBootApplication
public class EcoTwinBackendApplication {

	public static void main(String[] args) {
		String datasourceUrl = System.getenv("SPRING_DATASOURCE_URL");
		if (datasourceUrl != null) {
			if (datasourceUrl.startsWith("postgres://")) {
				datasourceUrl = "postgresql://" + datasourceUrl.substring("postgres://".length());
			}

			if (datasourceUrl.startsWith("postgresql://")) {
				System.setProperty("spring.datasource.url", "jdbc:" + datasourceUrl);

				URI parsedUrl = URI.create(datasourceUrl);
				String userInfo = parsedUrl.getUserInfo();
				if (userInfo != null && userInfo.contains(":")) {
					String[] credentials = userInfo.split(":", 2);
					System.setProperty("spring.datasource.username", credentials[0]);
					System.setProperty("spring.datasource.password", credentials[1]);
				}
			}
		}

		SpringApplication.run(EcoTwinBackendApplication.class, args);
	}

}
