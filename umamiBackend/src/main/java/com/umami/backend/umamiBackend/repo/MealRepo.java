package com.umami.backend.umamiBackend.repo;

import com.umami.backend.umamiBackend.models.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepo extends JpaRepository<Meal, String> {
}
