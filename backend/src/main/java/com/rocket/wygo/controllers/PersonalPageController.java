package com.rocket.wygo.controllers;


import com.rocket.wygo.response.FavorDisFavorResponse;
import com.rocket.wygo.response.UserPostResponse;
import com.rocket.wygo.services.ViewPersonalPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin
public class PersonalPageController {
    @Autowired
    ViewPersonalPageService viewPersonalPageService;

    @GetMapping("/{username}")
    public ResponseEntity<UserPostResponse> viewPersonalPageRequest(@PathVariable String username){
        try {
            UserPostResponse userPostDTO = viewPersonalPageService.viewPersonalPage(username);
            return ResponseEntity.ok(userPostDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getfavordisfavor/{username}")
    public ResponseEntity<FavorDisFavorResponse> getfavordisfavorList(@PathVariable String username){
        try {
            FavorDisFavorResponse userPostDTO = viewPersonalPageService.getFavorDisfavorList(username);
            return ResponseEntity.ok(userPostDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
