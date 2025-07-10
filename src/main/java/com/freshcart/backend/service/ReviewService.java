package com.freshcart.backend.service;

import com.freshcart.backend.entity.Review;
import com.freshcart.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service for review-related business logic.
 */
@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * Get all reviews.
     */
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    /**
     * Get a review by ID.
     */
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    /**
     * Create a new review.
     */
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    /**
     * Update an existing review.
     */
    public Optional<Review> updateReview(Long id, Review review) {
        return reviewRepository.findById(id).map(existing -> {
            review.setId(id);
            return reviewRepository.save(review);
        });
    }

    /**
     * Delete a review by ID.
     */
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
} 