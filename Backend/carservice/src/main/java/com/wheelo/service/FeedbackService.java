package com.wheelo.service;

import com.wheelo.dto.FeedbackDTO;

public interface FeedbackService {

    String saveFeedback(long bookingId, FeedbackDTO feedbackDTO);

    FeedbackDTO getFeedback(long bookingId);
}
