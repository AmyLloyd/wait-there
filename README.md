# Wait There

## Description

Wait There is a web application developed in response to a challenge faced by a sporting club's canteen. The canteen experienced a decline in sales due to the addition of a venue located further away. To address this issue, Wait There allows customers to submit online orders and have them delivered to their chosen location. The application has received positive feedback from both customers and canteen volunteers, who appreciate its user-friendly interface and its ability to support the club's canteen while allowing them to enjoy the game at their preferred location.

The small-scale nature of local sporting canteens was forefront when designing the app. The canteens are only open for limited hours, run by volunteers and hold minimal stock with the aim of selling out many items. In order to simplify stock management, all possible items held by the canteen were inputed then a simple "Available" and "Not available" button was added. Because the canteen runs both face-to-face and online, online payment is not available due to the risk of ordering items before stock status has been updated when it runs out.  

The interaction between the digital system and a delivery system made efficient logistics and communication channels a key consideration. Order status updates were also made available so that the canteen staff were able to communicate progress to the customer. Initial testing highlighted the need for alerts and notifications that would grab the attention of volunteers who were busy in customer service or conversation. Notification features will be implemented in the future.  


## Table of Contents (Optional)

If your README is long, consider adding a table of contents to help users navigate the document easily.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
To set up the development environment for this project, follow these steps:

1. Make sure you have Node.js installed on your machine. You can download it from the official Node.js website.

2. Open a terminal or command prompt and navigate to the project's root directory.

3. Run the following command to install the project dependencies:

    ```
    npm install
    ```

4. Once the installation is complete, you can start the development server by running the following command:

    ```
    npm start
    ```

    This command will start the application and make it accessible at a local development URL http://localhost:3001.

5. Open your web browser and navigate to the local development URL to access the application.

You now have the development environment set up and the application running locally. You can make changes to the code and see the updates in real-time as you save the files.

## Usage

Include instructions and examples on how to use the application. You can also add screenshots to enhance the user's understanding. To add a screenshot, create an `assets/images` folder in your repository and upload the screenshot there. Then, use the following syntax to include it in your README:

On the homepage, the user is able to login to their account.
![Wait There homepage](/public/images/homepage.png)

The user is taken to their dashboard where they view and manage items and orders. "Availability" buttons enable users to remove the items from the customer order page. All orders submitted are rendered on the dashboard and the user is able to update the status between "being prepared", "in-transit" and "delivered".

![Wait There dashboard](/public/images/dashboard.png)

Customers access the user's order page through posters at their venue. The poster holds a QR code that takes them to the ordering website and a specific location code that they are able to input with their order. This location will appear on the dashboard order details in order to make delivery possible. 

![Wait There order page](/public/images/order_page.png)

Customers are first presented with a user agreement which explains that they will need to stay at their location to receive their delivery.

![Wait There user agreement screen](/public/images/order_page.png)

On the order page the customer will enter their first name and location code from the poster which are then rendered in the top-right corner and held in local storage. As they select items, those items are rendered on the screen with quantity and total prices. 

![Wait There customer details input](/public/images/order_customer_details.png)

![Wait There order items](/public/images/order_listed_items.png)

Once submitted, a confirmation page appears which is their 'proof of order' on their delivery. Also, by holding up their phone with this bright red colour, the customer is able to inconspicusously identify themselves to the delivery person. 
![Wait There order confirmation screen](/public/images/order_confirmation.png)

## License

MIT License

Copyright (c) [2024] [Amy Lloyd]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
