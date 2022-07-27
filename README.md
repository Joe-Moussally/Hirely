<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.  


</div>

<br><br>


<img src="./readme/title2.svg"/>

>Hirely is an app that connects recruites with job seekers. It's purpose is to allow the job seeker to upload his CV and personal details to the app so that recruiters can check them out, as well as, recruiters will be able to post job offers with description and requirements, to be displayed to the job seeker.
> 
### User Stories
- As a job seeker, I want to apply for a suitable job according to my skills and knowledge.
- As a job seeker, i want to search a specific position I'm interested in.
- As a job seeker, I want to upload my CV and showcase my experiences and skills.
- As a job seeker,  I want to be in touch with recruiters to demonstrate my knowledge in the wanted position.
>
- As a recruiter, I want to post a job offer so that interested applicants can apply
- As as recruiter, I want the check out profiles of applicants who applied for the job I posted.
- As a recruiter, I want to message an applicant I am interested in.

<br><br>

<img src="./readme/title3.svg"/>

> The below screenshots show some aspects of the design that was planned before on paper, then moved to Figma app for the fine details.


| Landing/Log In  | My Jobs/Add Job |
| -----------| -----|
| <img src="./readme/screens/landing-login.JPG"/> |<img src="./readme/screens/myjobs-addoffer.JPG"/>|

| Chats/Conversation  | My Profile/View Job Offer  |
| -----------------| -----|
|  <img src="./readme/screens/chats-conversation.JPG"/>|<img src="./readme/screens/profile-viewjob.JPG"/>  |


<br><br>

<img src="./readme/title4.svg"/>

Here's a brief high-level overview of the tech stack used in Hirely:

- React Native, a JavaScript framework for writing mobile applications.
- Laravel, a PHP framework. It follows a model-view-controller design pattern.
- MySQL, a relational database management system (RDBMS) that is based on structured query language (SQL).
- Firebase, a Google-backed application development software that enables developers to develop iOS, Android and Web apps. Firebase provides tools for tracking analytics, reporting and fixing app crashes, creating marketing and product experiment.



<br><br>
<img src="./readme/title5.svg"/>

> Using the above mentioned tech stacks and the wireframes build with figma from the user sotries we have, the implementation of the app is shown as below, these are some screenshots from the real app

| Splash screen | Signup | Complete Profile |
|----------|-----------|-----------|
|<img src="./readme/screenshots/splash.jpg"  />  | <img src="./readme/screenshots/signup.jpg"  /> |<img src="./readme/screenshots/complete profile.jpg"/>  |



| Jobs | Realtime Chatting | Add Job  |
|----------|-----------|-----------|
|<img src="./readme/screenshots/jobs.jpg"  />  | <img src="./readme/screenshots/chatting.jpg"  /> |<img src="./readme/screenshots/add.jpg"/>  |



| Whatsapp Redirection | Search | Filter  |
|----------|-----------|-----------|
|<img src="./readme/screenshots/whatsapp.jpg"  />  | <img src="./readme/screenshots/search.jpg"  /> |<img src="./readme/screenshots/filter.jpg"/>  |



<br></br>
> Here's some short gifs from the real app


| Add Job | Apply | Applicants List | Hirely Message |
| ------------|----------|-----------|-----------|
|<img src="./readme/gifs/add_job.gif" />|<img src="./readme/gifs/apply.gif"  />  |<img src="./readme/gifs/applicants_list.gif"/>  |<img src="./readme/gifs/hirely_message.gif"/>  |



| Phonecall Redirection | Whatsapp Redirection | Realtime Chat | Change Picture |
| ------------|----------|-----------|-----------|
|<img src="./readme/gifs/phonecall_redirection.gif" />|<img src="./readme/gifs/whatsapp_redirection.gif"  />  |<img src="./readme/gifs/realtime_chat.gif"/>  |<img src="./readme/gifs/change_picture.gif"/>  |



| Search | Filter | Edit Profile | View Profile |
| ------------|----------|-----------|-----------|
|<img src="./readme/gifs/search.gif" />|<img src="./readme/gifs/filter.gif"  />  |<img src="./readme/gifs/edit_profile.gif"/>  |<img src="./readme/gifs/view_profile.gif"/>  |



| Admin Dashboard |
|----------|
|<img src="./readme/admin/admin.gif" />  |


<br><br>
<img src="./readme/title6.svg"/>


>To get a local copy up and running follow these simple example steps.

### Prerequisites

* Download and install [Node.js](https://nodejs.org/en/)

* npm
  ```sh
  npm install npm@latest -g
  ```
* Expo CLI
  ```sh
  npm install --global expo-cli
  ```
* Expo Go mobile app
 

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Joe-Moussally/Hirely.git
2. Navigate to the Frontend folder and install dependencies
   ```sh
   cd Hirely/react-native-app
   npm install
   ```
3. Run the start up command
   ```sh
   expo start
   ```
4. Scan the generated QR code with your camera (ios) or through the Expo Go application (android).