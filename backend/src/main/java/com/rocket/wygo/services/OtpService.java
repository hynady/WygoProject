package com.rocket.wygo.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {
    @Autowired
    private JavaMailSender mailSender;

    // Khởi tạo một map để lưu mã OTP cho từng người dùng (sẽ thay bằng cơ sở dữ liệu trong môi trường thực tế)
    private Map<String, String> otpMap = new HashMap<>();

    // Tạo mã OTP
    public String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    // Gửi mã OTP đến email của người dùng
    public void sendOTP(String email, String otp) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(email);
            helper.setSubject("Xác thực OTP");
            String content = "<html>" +
                    "<head>" +
                    "<style>" +
                    "body {font-family: Arial, sans-serif; background-color: #f4f4f4;}" +
                    ".container {background-color: #fff; padding: 20px; border-radius: 15px; margin: 10px auto; max-width: 500px;}" +
                    ".otp {color: #3090C7; font-size: 20px; font-weight: bold;}" +
                    "h2 {color: #444;}" +
                    "p {color: #666;}" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<h2>Xác thực OTP</h2>" +
                    "<p>Mã OTP của bạn là: <span class='otp'>" + otp + "</span></p>" +
                    "</div>" +
                    "</body>" +
                    "</html>";
            helper.setText(content, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        mailSender.send(message);
    }


    // Lưu mã OTP vào map (hoặc cơ sở dữ liệu)
    public void saveOTP(String email, String otp) {
        otpMap.put(email, otp);
    }

    // Kiểm tra mã OTP của người dùng
    public boolean verifyOTP(String email, String otp) {
        String savedOTP = otpMap.get(email);
        return savedOTP != null && savedOTP.equals(otp);
    }
}

