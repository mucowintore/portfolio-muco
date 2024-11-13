---
layout: doc
---

<script setup>
  import {data as group_blogs} from './group_project/group_project.data';
  import { withBase } from 'vitepress';
</script>

# Blogs

<ul v-if="group_blogs.length > 0">
  <li v-for="blog of group_blogs">
    <a :href="withBase(blog.url)">{{ blog.frontmatter.title }}</a>
  </li>
</ul>
<p v-else>
  Nothing here yet!
</p>
