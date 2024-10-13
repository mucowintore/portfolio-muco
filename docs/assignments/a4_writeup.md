---
title: A4 Write-up
layout: doc
next: false
---

# A4 Write-up

## Abstract Data Models


<h3>POSTING [User]</h3>

<u>Purpose</u>: Share content with other people

<u>Principle</u>: After user u shares content c, it is made available to other users

<u>State</u>:<br>
posts: set Post<br>
author: Post -> one User<br>
content: Post -> one Content<br>
mediaType: Post -> one MediaType<br>
textPosts, audioPosts, videoPosts -> set Post<br>

<u>Actions</u>:<br>
addPost(u: User, m: MediaType, c: Content, out p: Post)<br>
  posts += p<br>
  p.author := u<br>
  p.mediaType := m<br>
  p.content := c<br>
  
deletePost(p: Post)<br>
  posts -= p<br>

getAllPosts(out P: set Post)<br>
  P := posts<br>

getPostsBy(u: User, out P: set Post)<br>
  P := u.~author<br>

isReadable(p: Post)<br>
  p in textPosts

isListenable(p: Post)<br>
  p in audioPosts or p in videoPosts

<hr>
<h3>TRANSCRIBING [User, Item]</h3><br>

<u>Purpose</u>: Provide transcriptions of audio-based content

<u>Principle</u>: After user u adds a transcription t of item i, looking up transcriptions of i will yield a set of transcriptions T including t

<u>State</u>:<br>
transcriptions: Item -> set Transcription<br>
transcribedBy: Transcription -> one User<br>
transcript: Transcription -> one String<br>

<u>Actions</u>:<br>
addTranscription(u: User, i: Item, s: String, out t: Transcription)<br>
  i.transcriptions += t<br>
  t.transcribedBy :=u<br>
  t.transcript := s<br>

getItemTranscriptions(i: Item, out T: set Transcription)<br>
  T := i.transcriptions<br>

<hr>
<h3>TRANSLATING [User, Item]</h3>

<u>Purpose</u>: Making content more accessible to users

<u>Principle</u>: After adding a translation s of item i to language l, looking up translations of i will include s

<u>State</u>:<br>
translations: Item one -> set Translation<br>
translatedBy: Translation -> one User<br>
translated: Translation -> one String<br>
targetLanguage: Translation -> one Language<br>

<u>Actions</u>:<br>
addTranslation(u: User, i: Item, l: Language, s: String, out t: Translation)<br>
 i.translations += t<br>
 t.translatedBy := u<br>
 t.translated := s’<br>
 t.targetLanguage := l’<br>

getItemTranslations(Item i, out T: set Translation)<br>
 T := i.translations<br>

<hr>
<h3>RECORDING [User, Item]</h3>

<u>Purpose</u>: Provides audio recordings of text-based content

<u>Principle</u>: After user u adds a recording r with audio a for item i, that recording will be added to the set of recordings R for item i, and looking up recordings of i will yield R

<u>State</u>:<br>
recordings: Item -> set Recording<br>
recordedBy: Recording -> one User<br>
audio: Recording -> one Audio<br>

<u>Actions</u>:<br>
addRecording(u: User,  i: Item, a: Audio, out r: Recording)<br>
  i.recordings += r<br>
  r.recordedBy := u<br>
  r.audio := a<br>

getItemRecordings(i: Item, out R: set Recording)<br>
  R := i.recordings

<hr>
<h3>EXPLAINING [User, Item]</h3>

<u>Purpose</u>: Provide crowdsourced explanations of words or expressions in content

<u>Principle</u>: After a user u adds an explanation e for item i, looking up explanations of i will include e

<u>State</u>:<br>
explanations: Item -> set Explanation<br>
entry: Explanation -> one String<br>
explainedBy: Explanation -> one User<br>
definition: Explanation -> one String<br>
example: Explanation -> String<br>

<u>Actions</u><br>
addExplanation(u: User, i: Item, s: String, d: String, ex: String, out e: Explanation)<br>
 i.explanations += e<br>
 e.entry := s<br>
 e.explainedBy := u<br>
 e.definition := d<br>
 e.example := ex<br>
 
getItemExplanations(i: Item, out E: set Explanations)
 E := i.explanations

<hr>
<h3>UPVOTING [User, Item]</h3>

<u>Purpose</u>: Rank user contributions based on crowdsourced approvals

<u>Principle</u>: After a series of votes on content, content is ranked by their number of votes

<u>State</u><br>
upvotes: Item -> set Users
 
<u>Actions</u>:<br>
upvoteItem(u: User, i: Item)<br>
  u not in i.upvotes<br>
  i.upvotes += u<br>

removeItemUpvotes(i: Item)<br>
  i.upvotes = None<br>


<hr>
<h3>AUTHENTICATING</h3>

<u>Purpose</u>: Authenticate users

<u>Principle</u>: After a user registers with a username and password, they can authenticate as that user by providing a matching username and password

<u>State</u>:<br>
registered: set User<br>
username, password: registered -> one String<br>

<u>Actions</u>:<br>
register(n: String, p: String, out u: User)<br>
   u not in registered<br>
   add u to registered<br>
   set n as username of u<br>
   set p as password of u<br>

authenticate(username:String, password: String, out u:User)<br>
   u in registered<br>

### App-level actions

app Akarānga
include Authenticating<br/>
include Posting[Authenticating.User]<br/>
include Transcribing[Authenticating.User, Posting.Post]<br/>
include Translating[Authenticating.User, Posting.Post]<br/>
include Transcribing[Authenticating.User, Posting.Post]<br/>
include Recording[Authenticating.User, Posting.Post]<br/>
include Explaining[Authenticating.User, Posting.Post]<br/>

include Upvoting[Posting.Post]<br/>
include Upvoting[Translating.Translation]<br/>
include Upvoting[Transcribing.Transcription]<br/>
include Upvoting[Recording.Recording]<br/>


sync deletePost(post: Post)<br>
 When Posting.deletePost(post)<br>
  Transcribing.deleteItemTranscriptions(post)<br>
  Recording.deleteItemRecordings(post)<br>
  Translating.deleteItemTranslations(post)<br>
  Explaining.deleteItemExplainations(post)<br>
  Upvoting.removeItemUpvotes(post)<br>

sync transcribePost(post: Post)<br/>
 When Posting.isListenable(post)<br/>
  Transcribing.addTranscription(post)

sync recordPost(user u, p: Post, r: Recording)<br>
 When Posting.isReadable(post)<br>
  Recording.addRecording(u, p, r)<br>

sync translatePost(u: User, p: Post, translation: String, from: Language, to: Language)<br/>
  Translating.addTranslation(u, p, from, to, translation)

sync explainPost(u: User, p: Post, s: String, d: String, e: String)<br/>
  Explaining.addExplanation(u, p, s, d, e)

sync upvotePost(u: User, p: Post)<br/>
 Upvoting.upvoteItem(u, p)

sync upvoteTranslation(u: User, t: Translation)<br/>
 Upvoting.upvoteItem(u, t)

sync upvoteTranscription(u: User, t: Transcription)<br/>
 Upvoting.upvoteItem(u, t)

sync upvoteExplanation(u: User, e: Explanation)<br/>
 Upvoting.upvoteItem(u, e)

## Data model
![v](./global_data_diagram.jpg)<br/>


## Useful links
- [Backend repository](https://github.com/mucowintore/61040-a4-backend)
- [Vercel deployment](https://61040-a4-backend-seven.vercel.app/)