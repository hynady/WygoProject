package com.rocket.wygo.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "notification_type", nullable = false)
    private String notificationType;

    @Column(name = "noticed_time", nullable = false)
    private LocalDateTime noticedTime;

    public Notification() {
    }

    public Notification(Long id, String content, String notificationType, LocalDateTime noticedTime) {
        this.id = id;
        this.content = content;
        this.notificationType = notificationType;
        this.noticedTime = noticedTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public LocalDateTime getNoticedTime() {
        return noticedTime;
    }

    public void setNoticedTime(LocalDateTime noticedTime) {
        this.noticedTime = noticedTime;
    }
}
