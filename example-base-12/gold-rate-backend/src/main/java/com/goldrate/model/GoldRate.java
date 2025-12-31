package com.goldrate.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Gold rate data model containing year and price information")
public class GoldRate {
    
    @JsonProperty("year")
    @Schema(description = "Year of the gold rate record", example = "2020", requiredMode = Schema.RequiredMode.REQUIRED)
    private String year;
    
    @JsonProperty("price")
    @Schema(description = "Gold price per unit for the year", example = "48651.00", requiredMode = Schema.RequiredMode.REQUIRED)
    private String price;

    public GoldRate() {
    }

    public GoldRate(String year, String price) {
        this.year = year;
        this.price = price;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Double getPriceAsDouble() {
        try {
            return Double.parseDouble(price);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public Integer getYearAsInteger() {
        try {
            return Integer.parseInt(year);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @Override
    public String toString() {
        return "GoldRate{" +
                "year='" + year + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}

