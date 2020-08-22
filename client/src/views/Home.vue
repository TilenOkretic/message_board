<template>

  <div class="main">
    <div v-if="error" class="alert alert-dismissible alert-warning">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <h4 class="alert-heading">ERROR!</h4>
      <p class="mb-0">{{error}}
      </p>
    </div>

    <button
    @click="showMessageForm=!showMessageForm"
    type="button" class="btn btn-info mt-3 mb-3">
      Toggle Message Form</button>

    <form @submit.prevent="addMessage" v-if="showMessageForm">
  <div class="form-group">
    <label for="username">Username</label>
    <input v-model="message.username"
    type="text" id="username" class="form-control" required>
  </div>
   <div class="form-group">
    <label for="subject">Subject</label>
    <input v-model="message.subject" type="text" id="subject" class="form-control"
    placeholder="enter subject" required>
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea v-model="message.message" class="form-control" id="message" rows="3"></textarea>
  </div>
   <div class="form-group">
    <label for="img_rul">Image URL</label>
    <input v-model="message.img_url" type="url" id="img_url" class="form-control"
    placeholder="enter an image url">
  </div>
  <button type="submit" class="btn btn-info">Add Message</button>
  <h1>Message Board</h1>
</form>
    <div class="list-unstyled" v-for="message in messages" :key="message._id">
      <li class="media">
        <img class="mr-3" :src="message.img_url" :alt="message.subject">
        <div class="media-body">
            <h1 class="mt-0 mb-1">{{message.username}}</h1>
            <h2 class="mt-0 mb-1">{{message.subject}}</h2>
            {{message.message}}
            <br />
            <small>{{message.created}}</small>
        </div>
      </li>
        <hr>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:5000/messages';
export default {
  name: 'Home',
  data: () => ({
    showMessageForm: false,
    error: '',
    messages: [],
    message: {
      username: 'Anonymus',
      subject: '',
      message: '',
      img_url: '',
    },
  }),
  computed: {
    reverseMessages() {
      return this.messages.slice().reverse();
    },
  },
  mounted() {
    fetch(API_URL).then((resp) => resp.json()).then((res) => {
      this.messages = res;
    });
  },
  methods: {
    addMessage() {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(this.message),
      }).then((resp) => resp.json()).then((res) => {
        if (res.details) {
          const err = res.details.map((detail) => detail.message).join(' ');
          this.error = err;
        } else {
          this.error = '';
          this.showMessageForm = false;
          this.messages.push(res);
        }
      });
    },
  },
};

</script>

<style>
  .main {
    transform: scale(0.90);
  }
  hr {
    border-top: 2px solid white;
  }
  img {
    max-width: 300px;
    height: auto;
  }
</style>
