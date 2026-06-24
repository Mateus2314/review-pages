package com.reviewpages.service;

import com.reviewpages.config.JwtUtil;
import com.reviewpages.dto.*;
import com.reviewpages.entity.User;
import com.reviewpages.exception.BadRequestException;
import com.reviewpages.repository.ReadingRepository;
import com.reviewpages.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final ReadingRepository readingRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already in use");
        }
        if (userRepository.existsByName(request.getName())) {
            throw new BadRequestException("Name already in use");
        }

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        user = userRepository.save(user);

        return buildAuthResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }

        return buildAuthResponse(user);
    }

    public UserProfile getProfile(Long userId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("User not found"));
        return buildProfile(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        String token = jwtUtil.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, buildProfile(user));
    }

    private UserProfile buildProfile(User user) {
        return UserProfile.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .avatar(user.getAvatar())
                .bio(user.getBio())
                .createdAt(user.getCreatedAt())
                .totalReadings(readingRepository.countByUserId(user.getId()))
                .finishedReadings(readingRepository.countByUserIdAndStatus(user.getId(), com.reviewpages.entity.Reading.ReadingStatus.FINISHED))
                .averageRating(readingRepository.averageRatingByUserId(user.getId()))
                .build();
    }
}
