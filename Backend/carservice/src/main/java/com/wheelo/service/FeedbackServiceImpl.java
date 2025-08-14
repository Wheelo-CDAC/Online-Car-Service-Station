package com.wheelo.service;

import com.wheelo.dao.BookingDao;
import com.wheelo.dao.FeedbackDao;
import com.wheelo.dto.FeedbackDTO;
import com.wheelo.entities.BookingDetails;
import com.wheelo.entities.FeedbackDetails;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class FeedbackServiceImpl implements FeedbackService{

    @Autowired
    FeedbackDao feedbackDao;

    @Autowired
    BookingDao bookingDao;

    @Override
    public String saveFeedback(long bookingId, FeedbackDTO feedbackDTO) {
        FeedbackDetails feedbackDetails = new FeedbackDetails();

        feedbackDetails.setComment(feedbackDTO.getComment());
        feedbackDetails.setRating(feedbackDTO.getRating());
        FeedbackDetails saved = feedbackDao.save(feedbackDetails);

       Optional<BookingDetails> bookingDetails =  bookingDao.findById(bookingId);
       if(bookingDetails.isEmpty())
           throw new RuntimeException("Booking not exist!");
       BookingDetails b = bookingDetails.get();
       b.setFeedbackDetails(saved);
        bookingDao.save(b);
       return "Saved Feedback!";
    }

    @Override
    public FeedbackDTO getFeedback(long bookingId) {
        FeedbackDTO feedbackDTO = new FeedbackDTO();
        Optional<BookingDetails> bookingDetails =  bookingDao.findById(bookingId);
        if(bookingDetails.isEmpty())
            throw new RuntimeException("Booking not exist!");
        BookingDetails b = bookingDetails.get();
        FeedbackDetails feedbackDetails = b.getFeedbackDetails();
        if(feedbackDetails == null){
            feedbackDTO.setRating((short)0);
            feedbackDTO.setComment("");

        return feedbackDTO;
        }
        feedbackDTO.setComment(feedbackDetails.getComment());
        feedbackDTO.setRating(feedbackDetails.getRating());
        return feedbackDTO;
    }
}
