# Amazon-Flipkart_Frontend-BackendAutomation_withPerformance
This project includes:

Frontend Automation: Fetching and comparing product prices from Amazon and Flipkart using Playwright (JavaScript).
Backend Automation: API testing to fetch product prices using Amazon's Search Product API.
Performance Testing: A JMeter script to test the performance of Flipkart's search and add-to-cart functionality under load conditions.

Both the frontend and backend automation have been integrated into Jenkins for continuous execution.

Prerequisites:
Jenkins (installed locally or via Docker container)
NodeJS (version 22.8.0 or latest)
Maven (for backend automation)
JMeter (for performance testing)

Steps to Run Frontend and Backend Automation in Jenkins
1. Install Jenkins: Either install Jenkins locally or create a Docker container to run Jenkins.
2. Login to Jenkins: Use your credentials to log in to Jenkins.
3. Create a New Job:
   Navigate to New Item and select Freestyle Project.
4. Configure Job:
   Go to Source Code Management and select Git.
   In the Repository URL section, paste the following URL:
   https://github.com/pratikb220/Amazon-Flipkart_Frontend-BackendAutomation_withPerformance.git
   Set the Branch Specifier to */main.
5. Set Build Environment:
   Under Build Environment, check the option Provide Node & npm bin/ folder to PATH.
   Select NodeJS 22.8.0 (or any latest version). Make sure to install the NodeJS plugin from Jenkins Plugin Manager beforehand.
6. Add Build Steps:
   In the Build section, select Execute Shell and add the following commands:
   cd BackendAutomation/AmazonAPIautomation
   mvn clean test
   cd ../../FrontendAutomation
   npm install
   npx install playwright
   npx install playwright-deps
   npx playwright test AmazonFlipkartPriceCompare.spec.js
7. Post-Build Actions:
   Navigate to Post-Build Actions and select Archive the artifacts.
   In the "Files to archive" section, specify the path:
   playwright-report/index.html
8. Save and Build:
   Save the configuration and click Build Now to start the process.
   Jenkins will now run both the Frontend and Backend automation projects.

Steps to Run the JMeter Performance Test:
   1. Download and Install JMeter: Install the latest version of JMeter on your system.
   2. Open JMeter Script: Open the Flipkart_Search_Product.jmx file within JMeter.
   3. Run the Script: Click on the Run button to start the performance test.

Notes:
   1. Backend Automation: The Backend automation includes only Amazon API testing, as no APIs were found for Flipkart's search functionality.
   2. Amazon JMeter Limitation: Amazon does not permit automated performance testing with JMeter, leading to failures when attempting to run the .jmx file. Hence,        the JMeter script only applies to Flipkart.
