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
text, audio, video -> set Post<br>

<u>Actions</u>:<br>
addPost(u: User, c: Content, out p: Post)<br>
  posts += p<br>
  p.author := u<br>
  p.content := c<br>
  
getAllPosts(out P: set Post)<br>
  P := posts<br>

getPostsBy(u: User, out P: set Post)<br>
  P := u.~author<br>

isReadable(p: Post)<br>
  p in text

isListenable(p: Post)<br>
  p in audio or video

<hr>
<h3>TRANSCRIBING [User, Content]</h3><br>

<u>Purpose</u>: Provide transcriptions of audio-based content

<u>Principle</u>: After user u adds a transcription t of content c, looking up transcriptions of c will yield a set of transcriptions T including t

<u>State</u>:<br>
transcriptions: Content -> set Transcription<br>
transcribedBy: Transcription -> one User<br>
transcript: Transcription -> one String<br>

<u>Actions</u>:<br>
addTranscription(u: User, c: Content, s: String, out t: Transcription)<br>
  c.transcriptions += t<br>
  t.transcribedBy :=u<br>
  t.transcript := s<br>

getTranscriptions(c: Content, out T: set Transcription)<br>
  T := c.transcriptions<br>

<hr>
<h3>TRANSLATING [User, Content]</h3>

<u>Purpose</u>: Making content more accessible to users

<u>Principle</u>: After adding a translation s of content c to language l, looking up translations of c will include s

<u>State</u>:<br>
translations: Content one -> set Translation<br>
translatedBy: Translation -> one User<br>
translated: Translation -> one String<br>
targetLanguage: Translation -> one Language<br>

<u>Actions</u>:<br>
addTranslation(u: User, c: Content, l: Language, s: String, out t: Translation)<br>
 c.translations += t<br>
 t.translatedBy := u<br>
 t.translated := s’<br>
 t.targetLanguage := l’<br>

getTranslations(Content c, out T: set Translation)<br>
 T := c.translations<br>

<hr>
<h3>RECORDING [User, Content]</h3>

<u>Purpose</u>: Provides audio recordings of text-based content

<u>Principle</u>: After user u adds a recording r with audio a for content c, that recording will be added to the set of recordings R for content c, and looking up recordings of c will yield R

<u>State</u>:<br>
recordings: Content -> set Recording<br>
recordedBy: Recording -> one User<br>
audio: Recording -> one Audio<br>

<u>Actions</u>:<br>
addRecording(u: User,  c: Content, a: Audio, out r: Recording)<br>
  c.recordings += r<br>
  r.recordedBy := u<br>
  r.audio := a<br>

getRecordings(c: Content, out R: set Recording)<br>
  R := c.recordings

<hr>
<h3>EXPLAINING [User, Content]</h3>

<u>Purpose</u>: Provide crowdsourced explanations of words or expressions in content

<u>Principle</u>: After a user u adds an explanation e for content c, looking up explanations of c will include e

<u>State</u>:<br>
explanations: Content -> set Explanation<br>
entry: Explanation -> one String<br>
explainedBy: Explanation -> one User<br>
definition: Explanation -> one String<br>
example: Explanation -> String<br>

<u>Actions</u><br>
addExplanation(u: User, c: Content, s: String, d: String, ex: String, out e: Explanation)<br>
 c.explanations += e<br>
 e.entry := s<br>
 e.explainedBy := u<br>
 e.definition := d<br>
 e.example := ex<br>
 
getExplanations(c: Content, out E: set Explanations)
 E := c.explanations

<hr>
<h3>UPVOTING [User, Content]</h3>

<u>Purpose</u>: Rank user contributions based on crowdsourced approvals

<u>Principle</u>: After a series of votes on content, content is ranked by their number of votes

<u>State</u><br>
upvotes: Item -> set Users
 
<u>Actions</u>:<br>
upvoteItem(u: User, i: Item)<br>
  u not in i.upvotes<br>
  i.upvotes += u<br>


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