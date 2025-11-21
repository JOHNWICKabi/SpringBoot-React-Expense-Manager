package com.example.expensemanager.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class JokeService {

    private static final String JOKE_API_URL = "https://official-joke-api.appspot.com/random_joke";

    public String getRandomJoke() {
        RestTemplate restTemplate = new RestTemplate();
        var response = restTemplate.getForObject(JOKE_API_URL, Joke.class);
        return response == null ? "No joke found! Maybe U should make 1" : response.setup + " " + response.punchline;
    }
    
    private record Joke(String setup, String punchline) {}
}
