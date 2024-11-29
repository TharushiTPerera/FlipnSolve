package com.flipcard.flip_n_solve_backend.repository;

import com.flipcard.flip_n_solve_backend.model.player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface playerRepository extends JpaRepository<player ,Long> {
    player findByUsername(String username);
}
