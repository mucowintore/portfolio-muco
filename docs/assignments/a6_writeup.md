---
title: A6 Write-up
layout: doc
next: false
---

# A6 Write-up

## Task List

| Task	| Instruction |	Rationale |
| -- | -- | -- |
| 1. Register an account |	Create an account in the app | Given that registering is the first step in the onboarding process, it is crucial that it be as intuitive and straightforward as possible. Therefore, this task will be a good way to surface any potential inconsistencies or flaws during the onboarding |
| 2. Locate and open a post | Locate and open a specific post whose title is provided in the app | As one of the core functions of the app is to create posts and consume content, it is paramount that the interface enables the user to perform that task seamlessly. Moreover, all the other functionalities such as transcribing, translating, etc are accessed through the Post Details view, which the user reaches after they open a post. |
| 3. Add a translation to a post's video |	Add a translation of the first sentence of the video in a language of your choice | Translating posts is an important way that the platform fulfills its purpose by making the content more accessible to community members who are learning Kirundi and might be more comfortable in another language. Translating a whole post takes considerable effort. I am curious to see how the interface of my app facilitates the process or hinders it |
| 4. Explain a word in a post's text |	Add an explanation of a word of your choice to the post	| This feature provides a direct way for users to understand what a given word or expression means in a post. Therefore, my goal as I test this feature is to assess whether it is easy to use, both for users browsing the explanations and those contribute new explanations |
| 5. Upvoting a transcript| Like a transcription of your choice	| As the platform is essentially based on crowdsourcing, upvotes is the main mechanism by which users express approval of contributions. Testing upvoting with real users will enable me to ensure the feature works as intended. I am particularly interested in observing if the upvoting feature is intuitive to users across all the concepts it is used for |
| 6. Listen to a recording of a post's text | Locate and open a specific post whose title is provided and listen to the recording of the text | Testing this feature will enable me to ensure the media playing function properly across the variety of machine configurations of my users since I have only tested it on my limited set of devices |
| 7. Create a post |	Create a new post in the app	| Given that the post creation flow is the main way to contribute content on the platform, it is imperative that I assess how easy it is for real users to create a post on the platform. In order to avoid complexity, I opted not to implement an upload functionality like most users are probably used to. I am curious to see how the URL option is used by my participants |



## User Study Reports

#### User Study with George

The first user study was conducted with a native Kirundi speaker in his mid-twenties, who I will call George here. After briefing him about the app and his role, I provided him with the link to the app and asked him to register an account on the platform. That step was relatively straightforward and once he did that, I tasked him with locating and opening a specific post in the app, which he promptly did. The post in question was a popular Kirundi folklore song. Upon opening the post, I could sense a bit of hesitation on his part regarding what to do next. In particular, he wasn’t sure whether he was supposed to play the song or not and hesitated before pressing play. He told me he expected the song to play right away, which makes a lot of sense since opening a post signals that the user wants to check out its content. I took note of this as being a good example of an accelerator.

The following task involved contributing a translation to the post. Something interesting happened here. George had no trouble figuring out how to access the Add Translation flow. Rather, he jokingly pointed out that coming up with an actual translation was the hard part, saying: “I’m glad my father isn’t conducting this session. He’d be quite disappointed with!” I suggested that he translate any sentence that stuck out for him.

For the next two tasks, I asked him to go back to the homepage and open a different post. This time, the post was a cultural text. I gave him three tasks. The first one was contributing an explanation for a word or expression of his choice that appears in the text. He was able to do that quite easily. Next up was upvoting an existing contribution of his choice in the post. He chose an audio recording of the text but upon attempting to upvote it, he faced a challenge. It turned out that, his screen being narrower in width than the one I used during development, the recordings tab didn’t full expand and instead a scrollbar was provided. This led to him struggling to find the like button for the recording he was trying to upvote for several seconds before noticing the scrollbar and scrolling to reveal the button. This highlighted the importance of a responsive design that can work consistently across a diverse range of form factors.

The last task and arguably the most challenging one was creating a new post. He decided to create a text post and had no trouble choosing a title, a category and content for the post. However, he was completely confused by one of the fields, namely the thumbnail URL. He had no clue where to get that URL, asking me: “Am I supposed to be the one to provide the link?”. This was further complicated by the fact that the field was required and he couldn’t post without filling it. This highlighted a serious issue in the post-creation flow.

During the debriefing, Paul expressed that the platform was very interesting and addressed an important need, saying: “I can see myself using this platform to improve my Kirundi, especially the translation and explanation features.” He added that while he doesn’t think his command of Kirundi is such that he would contribute much to the platform, he felt he would benefit a lot from its content as a learner. He concluded by making what I think was a very valuable suggestion. He asked whether learners of Kirundi like him could contribute suggestions of words that they want other members to explain.

#### User Study with Paul

The second user study was conducted with a Kirundi speaker in his mid-fifties, who I will call Paul. Similarly to George, I briefed Paul on what his role will be and what I am trying to achieve. In this second user study, I varied the order of the tasks slightly from the first study. In particular, I changed the order of task 3 to 6, so that I can better assess how the user is doing and contrast their performance with the first participant.

We started out with registering an account, and Paul was able to complete the task easily. This was followed with locating and opening a post and this time I asked him to open a post that differs from the one in the first user study. He was able to locate and open the post quite easily. One thing he mentioned, however, is that in the one second it took for the post to open, he wasn’t sure that the action was registered by the app, probably because unlike most click targets in other sections of the app, the posts didn’t provide visual feedback that the click was registered. I took note of his observation.

Upon opening the post, he proudly announced he had successfully completed the task and asked for his next task. He recognized the cultural text in the post and his enthusiasm was palpable. We proceeded to the next task which consisted of playing one of the recordings that had been contributed for the post. He was able to play the recording and noted that the interface was very easy to use and, in particular, the labels made it easy for him to know where to find the recordings. 

We moved on to the next two tasks, adding a translation and word explanation to the post. For the translation task, he identified the translation section and added a translation following the instructions that appeared. In contrast to George’s experience, Paul enjoyed the process of contributing a translation and word explanations to the post. I think this is to be expected, as he is from an older generation and they generally have a much better command of the language than the younger generation. One thing he did struggle with, however, was typing diacritic marks as he was writing. He told me that it would be great to have an easy way to add diacritic marks as he types, given that those are ubiquitous in the language and serve a crucial function in understanding the text.

Similarly to George’s experience, Paul struggled during the post creation task, even more so than George. He had no idea what a thumbnail URL was supposed to be and once I explained it to him, had no clue how to provide one. This further highlighted the importance of rethinking how to enable users to contribute media assets in the app.


## Design Flaws / Opportunities

__1. How the app handles user contributions of media assets__ (Conceptual level, Critical severity)
- The current mechanism for users to contribute media assets, be it thumnails, audio and video content during post creation or
  audio files when contributing audio recordings to posts, is to provide a URL for that media file.
- This turned out to be very challenging for users during testing, causing confusion as to how they could obtain such a URL
- An improvement would be to instead provide an upload functionality where they can upload media files directly from their computer. While this is more complex technically, it is far more user-friendly and closer to what they are used to

__2. Responsive design of the sidebar section in the Post Details view (Physical level, Minor severity)__ 
- Depending on the size of the screen the user was using, the sidebar section of the Post Details view which contains the translation, recording, transcription and explanation features wouldn't fit in its container and a scrollbar had to be used. This introduced some friction in the session with George as he was looking for the like button to upvote a recording. While he was able to complete the task, I think it would be very easy to miss it.
- A solution would be to design the components in the section in a responsive way so that they can rearrange their elements to account for a variety of screen widths

__3. Difficulty typing diacritic marks when contributing textual content (Linguistic Level, Moderate severity)__
- Kirundi is a tone language, and as a result, tone has to be conveyed in writing through the use of diacritic marks. While I accounted for tone by using a font with complete support for them in the app,
I realized during testing that typing in Kirundi in the app was not straightforward. Whereas George already had an extension on his computer he uses to easily type diacritic marks, Paul found it very
difficult and eventually had to write without adding tones, which can significantly hinder understanding of the text for a reader.
- A solution would be to add in the UI a way to add diacritics as the user types, for example, as buttons or shortcuts that the user could use to type diacritic marks on the fly. A good inspiration is the extension that George uses, and that I also happen to use. It's called WinCompose and it basically enable a user to type accented vowels as combinations of keys readily available on regular keyboards. That could be incorporated in the app to make the typing experience more user-friendly

__4. No click feedback where opening a post on the homepage (Linguistic, Moderate severity)__
- George mentioned that when he clicked on one of the posts on the homepage, he couldn't tell if the click was successful or not during the second or two it took to open the post.
- A solution would be to visually provide click feedback, as I did in other parts of the app. This could include changing the cursor pointer to the familiar hand icon to suggest that the target is clickable and background color changes when the user hovers on the post and clicks it, respectively.

__5. Giving users with a limited command of the language more ways to contribute__
- This is less of a flaw and more of an opportunity for improving the app based on feedback I got from George. He pointed out that if it would be great if users who are learning Kirundi had a way to suggest learning material.
- For example, for the word explanation feature, he suggested that users be able to contribute suggestions of words they would like to have explained by other members of the community. This would be a great feature as it would enable users with a better command of the language such as Paul to actually use that information to decide what words to explain.