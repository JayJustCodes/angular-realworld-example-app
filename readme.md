## Components current structure

```
tailwind.config.js
.prettierrc
public/
assets/
src/
└── app/
    ├── app.config.ts
    ├── app.routes.ts
    ├── app.component.ts
    ├── pages/
    │   ├── contact-page/
    │   │   ├── contact-page.component.ts
    │   │   └── contact-page.component.html
    │   └── home-page/
    │       └── home-page.component.ts
    └── shared/
        └── components/
            ├── goods-list/
            ├── goods-item/
            └── header/
        └── models/
        └── pipes/
        └── services/
```
## Task 3.3 Enhance product list

1. Use a .ts file that will contain all your shop data. Create a service for storing data and use RxJs for retrieving data.
2. Implement product list (on Main page) whose data will be rendered from a file (save ts file to /assets). Do component separation. Create interfaces for data. If necessary, you can make small changes to the data. 
3. Use pipe for currency (display in EURO)
4. Create and apply custom pipe for characters limitation (~ 35 char.) in Description
5. Implement for main card of goods, discount - 70%, for first line of small cards - 60%, for others - 50%
6. Apply the color change (for Circle discount block, for Border and for price) depending on the discount amount (70% - red, 60% - pink, 50% -orange)