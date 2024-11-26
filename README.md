## Bonus task 

The discount logic has been separated from the product logic to ensure proper separation of concerns. Discount data is no longer embedded within each product. If the backend wants to send or update promotions, they can now directly update the JSON file containing the discount information.
Changes made:

-   Implemented theb discount JSON structure
-   Added a Discounts model and service
-   Refactored the GoodsListComponent to integrate the discount service
-   Linked discounts to product items based on product IDs
-   Implemented dynamic pricing display with discount calculations

Additional improvements:

-   Added `forkJoin` for improved parallel API calls handling
-   Implemented logging for development mode
-   Mocked a basic server in vanilla JS for testing delayed endpoints, accessible via `npm run mock-server`
-   Introduced a spinner and loadingService to handle delays from asynchronous connections
-   Unified the interface for products and discounts

Fixed parts:

- Added interface for LoadingState: Standardizes handling of various asynchronous connection states.
- Applied LoadingState to SpinnerComponent and GoodsListComponent 
- Refactored exports: Groups components, services, and models into index files for better importing.
- Refactored GoodsListComponent: Offloads fetching discounted items to a dedicated service.
