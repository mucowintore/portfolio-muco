---
title: A3 Write-up
layout: doc
next: false
---

# A3 Write-up

## Pitch

Are you worried about the state of your culture and language and want to learn more about it, connect with other speakers and contribute in preserving it? Akaranga is a social media app targeted at communities whose cultures and languages are endangered and provides them with a space where they can connect, learn, and document their cultural heritage and language. Content is made more accessible to community members yearning to learn about their cultural heritage through transcription and translation tools, as well as an explainer feature that enable you to learn difficult words and expressions. Akaranga harnesses the power of crowsourcing to enable communities to directly take part in the preservation of the cultural heritage. Learning about and contributing to your cultural heritage has never been this easy!

## Functional Design

### Concepts

POSTING [User]
Purpose: Share content with other people

Principle: After user u share content c, it is made available to other users

State: <br/>
posts: set Post<br/>
author: Post -> one User<br/>
content: Post -> one Content<br/>

Actions:

addPost(u: User, c: Content, out p: Post)<br/>
  posts += p<br/>
  p.author := u<br/>
  p.content := c
  
getPostsBy(u: User, out P: set Post)<br/>
  P := u.~author

<br/>

TRANSCRIBING [User, Content]<br/>
Purpose: Provide transcriptions of audio-based content

Principle: After user u adds a transcription t of content c, looking up transcriptions of c will yield a set of transcriptions T including t

State:<br/>
transcriptions: Content -> set Transcription<br/>
transcribedBy: Transcription -> one User<br/>
transcript: Transcription -> one String 

Actions

addTranscription(u: User, c: Content, s: String, out t: Transcription)<br/>
  c.transcriptions += t<br/>
  t.transcribedBy :=u<br/>
  t.transcript := s

getTranscriptions(c: Content, out T: set Transcription)<br/>
  T := c.transcriptions


TRANSLATING [User]<br/>
Purpose: Making content more accessible to users

Principle: After adding a translation s’ of string s from language l to language l’, looking up translations of s from language l to language l’ will include s’

State:<br/>
translations: Content -> set Translation<br/>
translatedBy: Translation -> one User<br/>
translated: Translation -> one String<br/>
sourceLanguage, targetLanguage: Translation -> one Language

Actions<br/>
addTranslation(u: User, c: Content, l: Language, l’: Language, s’: String, out t: Translation)<br/>
 c.translations += t<br/>
 t.translatedBy := u<br/>
 t.translated := s’<br/>
 t.sourceLanguage := l<br/>
 t.targetLanguage := l’

getTranslations(Content c, out T: set Translation)<br/>
 T := c.translations


RECORDING [User, Content]<br/>
Purpose: Provides audio recordings of textual content

Principle: After user u add a recording r for content c, that recording will be added to the set of recordings R for content c, and looking up recordings of c will yield R

State: <br/>
recordings: Content -> set Recording<br/>
recordedBy: Recording -> one User

Actions

addRecording(u: User,  c: Content, r: Recording)<br/>
  c.recordings += r<br/>
  r.recordedBy := u

getRecordings(c: Content, out R: set Recording)<br/>
  R := c.recordings


EXPLAINING [User, Content]<br/>
Purpose: Provide crowdsourced explanations of words or expressions in content 

Principle: After a user u adds an explanation e for a string s in content t, that explanation is added to the explanations available to other users for that content

State:<br/>
substrings: Content -> set String<br/>
explanations: Content -> set Explanation<br/>
entry: Explanation -> one String<br/>
explainedBy: Explanation -> one User<br/>
definition: Explanation -> one String<br/>
example: Explanation -> String

Actions

addExplanation(u: User, c: Content, s: String, d: String, ex: String out e: Explanation)<br/>
 s in c.substrings<br/>
 c.explanations += e<br/>
 e.entry := s<br/>
 e.explainedBy := u<br/>
 e.definition := d<br/>
 e.example := ex
 
getExplanations(c: Content, out E: set Explanations)<br/>
 E := c.explanations




UPVOTING [User, Item]<br/>
Purpose: Rank user contributions based on crowdsourced approvals

Principle: After a series of votes on items, items are ranked by their number of votes

State<br/>
upvotes: Item -> set Users
 
Actions:

upvoteItem(u: User, i: Item)<br/>
  u not in i.upvotes<br/>
  i.upvotes += u

AUTHENTICATING<br/>
Purpose: Authenticate users

Principle: After a user registers with a username and password, they can authenticate as that user by providing a matching username and password

State:<br/>
registered: set User<br/>
username, password: registered -> one String

Actions:

register(n: String, p: String, out u: User)<br/>
   u not in registered<br/>
   add u to registered<br/>
   set n as username of u<br/>
   set p as password of u

authenticate(username:String, password: String, out u:User)<br/>
   u in registered



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



sync upvotePost(u: User, p: Post)<br/>
 Upvoting.upvoteItem(u, p)

sync upvoteTranslation(u: User, t: Translation)<br/>
 Upvoting.upvoteItem(u, t)

sync upvoteTranscription(u: User, t: Transcription)<br/>
 Upvoting.upvoteItem(u, t)

sync upvoteExplanation(u: User, e: Explanation)<br/>
 Upvoting.upvoteItem(u, e)

sync transcribePost(post: Post)<br/>
  Transcribing.addTranscription(post)

sync recordPost(user u, p: Post, r: Recording)<br/>
  Recording.addRecording(u, p, r)

sync translatePost(u: User, p: Post, translation: String, from: Language, to: Language)<br/>
  Translating.addTranslation(u, p, from, to, translation)

sync explainPost(u: User, p: Post, s: String, d: String, e: String)<br/>
  Explaining.addExplanation(u, p, s, d, e)


### Dependency Diagram
![dependency](./dependency_diagram.jpg)

## Wireframes
![v](./1.jpeg)<br/>
![v](./2.jpeg)<br/>
![v](./3.jpeg)<br/>