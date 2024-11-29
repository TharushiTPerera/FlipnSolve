package com.flipcard.flip_n_solve_backend.controller;

import com.flipcard.flip_n_solve_backend.Service.BananaGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BananaGameController {

    @Autowired
    private BananaGameService bananaGameService;

    @GetMapping("/banana-puzzle")
    public String getBananaPuzzle() {
        return bananaGameService.fetchBananaPuzzle();
    }
}


