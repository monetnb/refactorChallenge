# The Refactor Challenge

You have been tasked with making this code better. It's difficult to read and understand, slow, and memory intensive. Unfortunately, it relies on some heavy functions and you can't change everything that it depends on, but there is still a lot you can improve.

Your main focus is the original.ts file. It contains the beefiest function. But explore what else you can do to make it better. If the file doesn't contain comments limiting what you can edit, have at it. 

## Requirements
1. Your function will always receive a payload with the same structure as the test-payload. Basically, it's an object with an array of Sessions. Sessions are objects themselves with an array of Events. Events are also objects that contain a key,value pair of Details: Object.
2. Sometimes the Details of an Event have imageMedia or videoMedia. When this is included, it's value is a base64 string.
3. Find all the Events that have those keys. For each Event with imageMedia or videoMedia, you need to convert that base64 to a CDN URL by simulating uploading the base64 to the cloud with the convertData function.
4. After converting the base64 string, replace the value for imageMedia or videoMedia in the original Details object with the new CDN URL.
5. Finally, instantiate the publisher with the real-time messenger client, and publish the final result which should be equal to the original payload just with different values for imageMedia or videoMedia whenever they exist. 

In this challenge, publish requires passing the final payload result containing all Sessions, Events, and Details. It will deep check if it is equal to the result in final.ts.

## Instructions
1. Clone the repo.
2. Run npm install.
3. Run ts-node runner.ts - this will output the baseline time & memory usage. Make it better.

## Grading
We will follow the same instructions. So upload your final code, and we should be able to run the same command in step 3. 

Good luck!
