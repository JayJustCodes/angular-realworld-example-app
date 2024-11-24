## Bonus task 

The discount logic has been separated from the product logic to ensure proper separation of concerns. Discount data is no longer embedded within each product. If the backend wants to send or update promotions, they can now directly update the JSON file containing the discount information.
Changes made:

-   Implemented the [discount JSON](https://git.foxminded.ua/foxstudent102868/angular/-/blob/task-bonus-discounts/assets/mock-data/task-3-2/items.json) structure
-   Added a Discounts [model](https://git.foxminded.ua/foxstudent102868/angular/-/blob/task-bonus-discounts/src/app/shared/models/discounts.model.ts) and [service](https://git.foxminded.ua/foxstudent102868/angular/-/blob/task-bonus-discounts/src/app/shared/services/discounts.service.ts)
-   Refactored the [GoodsListComponent](https://git.foxminded.ua/foxstudent102868/angular/-/blob/task-bonus-discounts/src/app/shared/components/goods-list/goods-list.component.ts) to integrate the discount service
-   Linked discounts to [product items](https://git.foxminded.ua/foxstudent102868/angular/-/blob/task-bonus-discounts/src/app/shared/components/goods-list/goods-list.component.html) based on product IDs
-   Implemented dynamic pricing display with discount [calculations](https://git.foxminded.ua/foxstudent102868/angular/-/blob/task-bonus-discounts/src/app/shared/components/goods-item/goods-item.component.ts)

Additional improvements:

- Added forkJoin for improved parallel API calls handling.
- Implemented logging for development mode
- Mocked a basic server in vanilla JS for testing delayed endpoints, accessible via npm run mock-server

- Introduced a spinner and loadingService to handle delays from asynchronous connections
- Unified the interface for products and discounts

Fixed parts:

- Added interface for LoadingState: Standardizes handling of various asynchronous connection states.
- Applied LoadingState to SpinnerComponent and GoodsListComponent 
- Refactored exports: Groups components, services, and models into index files for better importing.
- Refactored GoodsListComponent: Offloads fetching discounted items to a dedicated service.
