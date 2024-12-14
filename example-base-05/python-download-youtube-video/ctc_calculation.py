import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("salary_calculation.log"), logging.StreamHandler()],
)

def calculate_salary(hourly_rate_usd, hours_per_week, usd_to_inr, deduction_percent):
    try:
        # Step 1: Calculate annual and monthly salary in USD
        annual_salary_usd = hourly_rate_usd * hours_per_week * 52
        monthly_salary_usd = annual_salary_usd / 12
        logging.info(f"Annual Salary (USD): {annual_salary_usd}")
        logging.info(f"Monthly Salary (USD): {monthly_salary_usd}")

        # Step 2: Convert to INR
        annual_salary_inr = annual_salary_usd * usd_to_inr
        monthly_salary_inr = monthly_salary_usd * usd_to_inr
        logging.info(f"Annual Salary (INR): {annual_salary_inr}")
        logging.info(f"Monthly Salary (INR): {monthly_salary_inr}")

        # Step 3: Deduct taxes and other deductions
        total_deductions = (deduction_percent / 100) * annual_salary_inr
        take_home_annual = annual_salary_inr - total_deductions
        take_home_monthly = take_home_annual / 12
        logging.info(f"Total Deductions (INR): {total_deductions}")
        logging.info(f"Take-Home Annual Salary (INR): {take_home_annual}")
        logging.info(f"Take-Home Monthly Salary (INR): {take_home_monthly}")

        # Return results as a dictionary
        return {
            "annual_salary_inr": annual_salary_inr,
            "monthly_salary_inr": monthly_salary_inr,
            "take_home_annual": take_home_annual,
            "take_home_monthly": take_home_monthly,
        }
    except Exception as e:
        logging.error(f"Error during calculation: {e}")
        raise

if __name__ == "__main__":
    # Inputs
    HOURLY_RATE_USD = 17       # $25 per hour
    HOURS_PER_WEEK = 40        # 40 hours per week
    USD_TO_INR = 83            # Exchange rate
    DEDUCTION_PERCENT = 35     # 35% for tax, PF, etc.

    logging.info("Starting salary calculation...")
    result = calculate_salary(HOURLY_RATE_USD, HOURS_PER_WEEK, USD_TO_INR, DEDUCTION_PERCENT)

    # Print results
    logging.info("Calculation completed. Results:")
    print("Effective CTC (INR per year):", round(result["annual_salary_inr"], 2))
    print("Effective CTC (INR per month):", round(result["monthly_salary_inr"], 2))
    print("Take-Home Salary (INR per year):", round(result["take_home_annual"], 2))
    print("Take-Home Salary (INR per month):", round(result["take_home_monthly"], 2))
