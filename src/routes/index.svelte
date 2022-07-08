<script context="module" lang="ts">
  import type { User, Topic } from './Forum.types';

  export async function load() {
    const response = await fetch(`https://forum-proxy.freecodecamp.rocks/latest`);
    const JSON = await response.json();
    console.log('JSON', JSON);
    if (response.ok) {
      return {
        status: response.status,
        props: {
          users: JSON.users,
          topics: JSON.topic_list.topics
        }
      };
    }
  }
</script>

<script lang="ts">
  import { formatDistanceStrict } from 'date-fns';
  export let users: User[];
  export let topics: Topic[];

  const getAvatar = (user: User | undefined) => {
    if (user?.avatar_template) {
      if (user?.avatar_template.includes('discourse')) {
        // "https://avatars.discourse-cdn.com/v4/letter/e/d07c76/{size}.png"
        return user?.avatar_template.replace('{size}', '25');
      }
      return `https://forum.freecodecamp.org/${user?.avatar_template.replace('{size}', '25')}`;
    }
  };

  const getUser = (userId: number): User | undefined => {
    return users?.find((user) => user?.id === userId);
  };

  const formatTime = (word: string) => {
    const [time, words] = word.split(' ');
    return `${time}${words[0]}`;
  };
</script>

<div class="container">
  {#if topics}
    <div class="details">
      <h4>Topic</h4>
      <h4>Replies</h4>
      <h4>Views</h4>
      <h4>Activity</h4>
    </div>
    {#each topics as topic}
      <div class="topic">
        <div class="topic-title">
          <a href={`https://forum.freecodecamp.org/t/${topic.slug}`}>{topic.title}</a>
        </div>
        <div class="topic-posters">
          {#each topic.posters as poster}
            <div class="poster">
              <a href={`https://forum.freecodecamp.org/u/${getUser(poster.user_id)?.username}`}>
                <img src={getAvatar(getUser(poster.user_id))} alt="avatar" />
              </a>
            </div>
          {/each}
        </div>
        <div class="replies">
          {topic.reply_count}
        </div>
        <div class="views">
          {topic.views}
        </div>
        <div class="topic-date">
          {formatTime(formatDistanceStrict(new Date(topic.bumped_at), new Date()))}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .container {
    width: min(1110px, 90%);
    margin-inline: auto;
    min-width: 520px;
    color: rgb(135, 136, 147);
  }

  .details {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    gap: 1.5rem;
    border-bottom: 3px solid #424255;
  }

  .details > h4 {
    margin-bottom: 1rem;
  }

  .topic {
    display: grid;
    grid-template-columns: 1fr auto 2.5rem 4.5rem 2.5rem;
    gap: 2rem;
    padding-block: 1.2rem;
    border-bottom: 1px solid #424255;
  }

  .topic-posters {
    display: flex;
    gap: 0.3rem;
    margin-left: auto;
  }

  .replies,
  .views,
  .topic-date {
    flex: 0 1 80px;
    color: rgb(135, 136, 147);
  }

  .topic-title {
    flex: 1;
  }

  a {
    text-decoration: none;
    color: #dddee0;
    font-family: inherit;
    font-size: 1.4rem;
  }
  @media (max-width: 768px) {
    a {
      font-size: 1rem;
    }
  }
</style>
