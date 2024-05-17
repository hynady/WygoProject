package com.rocket.wygo.controllers;

import com.rocket.wygo.services.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OtpController {
    @Autowired
    private OtpService otpService;

    public static class OtpRequest {
        public String email;
        public String otp;
    }

    // API để gửi OTP đến email của người dùng
    @PostMapping("/sendOTP")
    public ResponseEntity<String> sendOTP(@RequestBody OtpRequest request) {
        String otp = otpService.generateOTP();
        otpService.sendOTP(request.email, otp);
        otpService.saveOTP(request.email, otp);
        return ResponseEntity.ok("OTP đã được gửi đến email của bạn.");
    }

    // API để xác thực OTP
    @PostMapping("/verifyOTP")
    public ResponseEntity<String> verifyOTP(@RequestBody OtpRequest request) {
        if (otpService.verifyOTP(request.email, request.otp)) {
            return ResponseEntity.ok("Xác thực thành công.");
        } else {
            return ResponseEntity.badRequest().body("Mã OTP không đúng.");
        }
    }
}