<template>
  <div class="board">

    <h1>Chat</h1>
    <div>
      <ul>
        <li v-for="(chat, i) in chats" :key="i">{{ chat }}</li>
      </ul>
    </div>
    <form @submit.prevent="submit">
      <input type="text" v-model="msg">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chats: [],
      msg: ''
    }
  },
  methods: {
    submit() {
      this.$socket.emit('chat', { msg: this.msg })
      this.msg = ''
    }
  },
  sockets: {
    chat({ msg }) {
      this.chats.push(msg)
    }
  }
}
</script>
