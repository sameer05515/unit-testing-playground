package com.goldrate.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.goldrate.model.GoldRate;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GoldRateService {

    @Value("${gold.rate.data.file}")
    private Resource goldRateDataFile;

    private List<GoldRate> goldRates = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void loadGoldRateData() {
        try {
            InputStream inputStream = goldRateDataFile.getInputStream();
            goldRates = objectMapper.readValue(inputStream, new TypeReference<List<GoldRate>>() {});
            System.out.println("Loaded " + goldRates.size() + " gold rate records");
        } catch (IOException e) {
            System.err.println("Error loading gold rate data: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<GoldRate> getAllGoldRates() {
        return new ArrayList<>(goldRates);
    }

    public Optional<GoldRate> getGoldRateByYear(String year) {
        return goldRates.stream()
                .filter(rate -> rate.getYear().equals(year))
                .findFirst();
    }

    public List<GoldRate> getGoldRatesByYearRange(String startYear, String endYear) {
        try {
            int start = Integer.parseInt(startYear);
            int end = Integer.parseInt(endYear);
            
            return goldRates.stream()
                    .filter(rate -> {
                        Integer year = rate.getYearAsInteger();
                        return year != null && year >= start && year <= end;
                    })
                    .collect(Collectors.toList());
        } catch (NumberFormatException e) {
            return new ArrayList<>();
        }
    }

    public Optional<GoldRate> getLatestGoldRate() {
        return goldRates.stream()
                .max((r1, r2) -> {
                    Integer year1 = r1.getYearAsInteger();
                    Integer year2 = r2.getYearAsInteger();
                    if (year1 == null || year2 == null) return 0;
                    return year1.compareTo(year2);
                });
    }

    public Optional<GoldRate> getOldestGoldRate() {
        return goldRates.stream()
                .min((r1, r2) -> {
                    Integer year1 = r1.getYearAsInteger();
                    Integer year2 = r2.getYearAsInteger();
                    if (year1 == null || year2 == null) return 0;
                    return year1.compareTo(year2);
                });
    }

    public Double calculatePriceChange(String startYear, String endYear) {
        Optional<GoldRate> startRate = getGoldRateByYear(startYear);
        Optional<GoldRate> endRate = getGoldRateByYear(endYear);
        
        if (startRate.isPresent() && endRate.isPresent()) {
            Double startPrice = startRate.get().getPriceAsDouble();
            Double endPrice = endRate.get().getPriceAsDouble();
            
            if (startPrice != null && endPrice != null && startPrice > 0) {
                return ((endPrice - startPrice) / startPrice) * 100;
            }
        }
        return null;
    }
}

