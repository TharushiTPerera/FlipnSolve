package com.flipcard.flip_n_solve_backend.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@Service
public class BananaGameService {

    private final String BANANA_API_URL = "https://marcconrad.com/uob/banana/";

    public String fetchBananaPuzzle() {
        RestTemplate restTemplate = new RestTemplate();

        // Send a GET request to the Banana Game API
        ResponseEntity<String> response = restTemplate.getForEntity(BANANA_API_URL, String.class);

        if(response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            throw new RuntimeException("Failed to fetch Banana puzzle from the API");
        }
    }
}


