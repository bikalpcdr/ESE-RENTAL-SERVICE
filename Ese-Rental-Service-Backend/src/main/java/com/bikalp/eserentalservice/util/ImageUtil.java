package com.bikalp.eserentalservice.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class ImageUtil {

    public static String convertToBase64(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }
        byte[] bytes = file.getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }

    public static List<String> convertMultipleToBase64(List<MultipartFile> files) throws IOException {
        if (files == null || files.isEmpty()) {
            return List.of();
        }
        return files.stream()
                .filter(file -> !file.isEmpty())
                .map(file -> {
                    try {
                        return convertToBase64(file);
                    } catch (IOException e) {
                        throw new RuntimeException("Error converting image to base64", e);
                    }
                })
                .collect(Collectors.toList());
    }
} 