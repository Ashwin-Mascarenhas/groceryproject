package com.freshcart.backend.service;

import com.freshcart.backend.entity.Category;
import com.freshcart.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service for category-related business logic.
 */
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Get all categories.
     */
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Get a category by ID.
     */
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    /**
     * Create a new category.
     */
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    /**
     * Update an existing category.
     */
    public Optional<Category> updateCategory(Long id, Category category) {
        return categoryRepository.findById(id).map(existing -> {
            category.setId(id);
            return categoryRepository.save(category);
        });
    }

    /**
     * Delete a category by ID.
     */
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
} 