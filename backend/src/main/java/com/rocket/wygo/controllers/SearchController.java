package com.rocket.wygo.controllers;

import com.rocket.wygo.response.CustomSearchResponse;
import com.rocket.wygo.response.SearchResultsRespond;
import com.rocket.wygo.services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping()
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query) {
        CustomSearchResponse results = searchService.search(query);
        return ResponseEntity.ok(results);
    }
}



