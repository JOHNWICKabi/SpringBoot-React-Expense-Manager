package com.example.expensemanager.controller;

import com.example.expensemanager.service.JokeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jokes")
@CrossOrigin(origins = "http://localhost:3000")
public class JokeController {

    @Autowired
    private JokeService jokeService;

    @GetMapping
    public String getJoke() {
        return jokeService.getRandomJoke();
    }
}
