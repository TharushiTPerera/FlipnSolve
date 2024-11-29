package com.flipcard.flip_n_solve_backend.controller;

import com.flipcard.flip_n_solve_backend.model.player;
import com.flipcard.flip_n_solve_backend.repository.playerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class playerController {

    @Autowired
    private playerRepository playerRepository;

    @PostMapping("/player")
    player newPlayer(@RequestBody player newPlayer){
        return playerRepository.save(newPlayer);

    }
    @GetMapping("/players")
    List<player> getAllUsers(){
        return playerRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody player player) {
        player foundPlayer = playerRepository.findByUsername(player.getUsername());

        // Check if the user exists and passwords match
        if (foundPlayer != null && foundPlayer.getPassword().equals(player.getPassword())) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid username or password");
        }

    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody player newPlayer) {
        player existingPlayer = playerRepository.findByUsername(newPlayer.getUsername());

        if (existingPlayer != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken");
        }

        playerRepository.save(newPlayer);
        return ResponseEntity.ok("Registration successful!");
    }
    @GetMapping("/scoreboard")
    public List<player> getTopPlayers(@RequestParam(defaultValue = "10") int limit) {
        return playerRepository.findAll(PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "score"))).getContent();
    }
    @PutMapping("/updateScore")
    public ResponseEntity<String> updateScore(@RequestBody Map<String, Object> payload) {
        String username = (String) payload.get("username");
        int points = (int) payload.get("points");

        player foundPlayer = playerRepository.findByUsername(username);

        if (foundPlayer != null) {
            foundPlayer.setScore(foundPlayer.getScore() + points); // Increment the score
            playerRepository.save(foundPlayer);
            return ResponseEntity.ok("Score updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player not found");
        }
    }

}
