## Bonus task 

The discount logic has been separated from the product logic to ensure proper separation of concerns. Discount data is no longer embedded within each product. If the backend wants to send or update promotions, they can now directly update the JSON file containing the discount information.
Changes made:

-   Implemented the discount JSON structure
-   Added a Discounts model and service
-   Refactored the GoodsListComponent to integrate the discount service
-   Linked discounts to product items based on product IDs
-   Implemented dynamic pricing display with discount calculations
