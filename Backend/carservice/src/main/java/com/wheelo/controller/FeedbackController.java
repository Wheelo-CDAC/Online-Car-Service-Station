package com.wheelo.controller;

import com.wheelo.dto.FeedbackDTO;
import com.wheelo.service.FeedbackService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
@AllArgsConstructor
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/{bookingId}")
    public ResponseEntity<?> createFeedback(@RequestBody FeedbackDTO feedbackDTO, @PathVariable long bookingId){
        String msg = feedbackService.saveFeedback(bookingId, feedbackDTO);

return  ResponseEntity.ok(msg);
    }

    @GetMapping("/get/{bookingId}")
    public ResponseEntity<?> getFeedback(@PathVariable long bookingId){
        return ResponseEntity.ok(feedbackService.getFeedback(bookingId));
    }

}
