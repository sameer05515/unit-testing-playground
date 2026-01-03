package com.goldrate.controller;

import com.goldrate.model.GoldRate;
import com.goldrate.service.GoldRateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gold-rates")
@CrossOrigin(origins = "*")
@Tag(name = "Gold Rate API", description = "RESTful API endpoints for managing and querying gold rate data")
public class GoldRateController {

    private final GoldRateService goldRateService;

    public GoldRateController(GoldRateService goldRateService) {
        this.goldRateService = goldRateService;
    }

    /**
     * Get all gold rates
     * GET /api/gold-rates
     */
    @Operation(
            summary = "Get all gold rates",
            description = "Retrieves a list of all gold rate records from 1964 to 2025"
    )
    @ApiResponse(
            responseCode = "200",
            description = "Successfully retrieved all gold rates",
            content = @Content(schema = @Schema(implementation = GoldRate.class))
    )
    @GetMapping
    public ResponseEntity<List<GoldRate>> getAllGoldRates() {
        List<GoldRate> goldRates = goldRateService.getAllGoldRates();
        return ResponseEntity.ok(goldRates);
    }

    /**
     * Get gold rate by year
     * GET /api/gold-rates/{year}
     */
    @Operation(
            summary = "Get gold rate by year",
            description = "Retrieves the gold rate for a specific year"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Gold rate found",
                    content = @Content(schema = @Schema(implementation = GoldRate.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Gold rate not found for the specified year"
            )
    })
    @GetMapping("/{year}")
    public ResponseEntity<GoldRate> getGoldRateByYear(
            @Parameter(description = "Year to retrieve gold rate for", example = "2020", required = true)
            @PathVariable String year) {
        Optional<GoldRate> goldRate = goldRateService.getGoldRateByYear(year);
        return goldRate.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get gold rates by year range
     * GET /api/gold-rates/range?startYear={startYear}&endYear={endYear}
     */
    @Operation(
            summary = "Get gold rates by year range",
            description = "Retrieves all gold rates within the specified year range (inclusive)"
    )
    @ApiResponse(
            responseCode = "200",
            description = "Successfully retrieved gold rates for the specified range",
            content = @Content(schema = @Schema(implementation = GoldRate.class))
    )
    @GetMapping("/range")
    public ResponseEntity<List<GoldRate>> getGoldRatesByRange(
            @Parameter(description = "Start year of the range", example = "2020", required = true)
            @RequestParam String startYear,
            @Parameter(description = "End year of the range", example = "2024", required = true)
            @RequestParam String endYear) {
        List<GoldRate> goldRates = goldRateService.getGoldRatesByYearRange(startYear, endYear);
        return ResponseEntity.ok(goldRates);
    }

    /**
     * Get latest gold rate
     * GET /api/gold-rates/latest
     */
    @Operation(
            summary = "Get latest gold rate",
            description = "Retrieves the most recent gold rate record (highest year)"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Latest gold rate found",
                    content = @Content(schema = @Schema(implementation = GoldRate.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "No gold rate data available"
            )
    })
    @GetMapping("/latest")
    public ResponseEntity<GoldRate> getLatestGoldRate() {
        Optional<GoldRate> goldRate = goldRateService.getLatestGoldRate();
        return goldRate.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get oldest gold rate
     * GET /api/gold-rates/oldest
     */
    @Operation(
            summary = "Get oldest gold rate",
            description = "Retrieves the oldest gold rate record (lowest year)"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Oldest gold rate found",
                    content = @Content(schema = @Schema(implementation = GoldRate.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "No gold rate data available"
            )
    })
    @GetMapping("/oldest")
    public ResponseEntity<GoldRate> getOldestGoldRate() {
        Optional<GoldRate> goldRate = goldRateService.getOldestGoldRate();
        return goldRate.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Calculate price change percentage between two years
     * GET /api/gold-rates/price-change?startYear={startYear}&endYear={endYear}
     */
    @Operation(
            summary = "Calculate price change percentage",
            description = "Calculates the percentage change in gold price between two specified years"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Price change calculated successfully"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid years or data not found for the specified years"
            )
    })
    @GetMapping("/price-change")
    public ResponseEntity<?> calculatePriceChange(
            @Parameter(description = "Start year for calculation", example = "2020", required = true)
            @RequestParam String startYear,
            @Parameter(description = "End year for calculation", example = "2024", required = true)
            @RequestParam String endYear) {
        Double change = goldRateService.calculatePriceChange(startYear, endYear);
        if (change != null) {
            return ResponseEntity.ok(new PriceChangeResponse(startYear, endYear, change));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid years or data not found");
    }

    // Inner class for price change response
    @Schema(description = "Response model for price change calculation")
    private static class PriceChangeResponse {
        @Schema(description = "Start year used in calculation", example = "2020")
        private String startYear;
        
        @Schema(description = "End year used in calculation", example = "2024")
        private String endYear;
        
        @Schema(description = "Percentage change in price", example = "60.12")
        private Double percentageChange;

        public PriceChangeResponse(String startYear, String endYear, Double percentageChange) {
            this.startYear = startYear;
            this.endYear = endYear;
            this.percentageChange = percentageChange;
        }

        public String getStartYear() {
            return startYear;
        }

        public String getEndYear() {
            return endYear;
        }

        public Double getPercentageChange() {
            return percentageChange;
        }
    }
}

