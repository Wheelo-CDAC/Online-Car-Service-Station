package com.wheelo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "feedback_details")
public class FeedbackDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private long feedbackId;

    @Column(name = "rating")
    private Short rating;

    @Column(name = "comment", length = 100)
    private String comment;

    @Column(name = "creation_date")
    private LocalDateTime creationDate;

    @Column(name = "updatedOn")
    private LocalDateTime updatedOn;
}
