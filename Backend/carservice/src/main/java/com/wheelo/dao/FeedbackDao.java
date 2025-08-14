package com.wheelo.dao;

import com.wheelo.entities.FeedbackDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackDao extends JpaRepository<FeedbackDetails, Long> {
}
