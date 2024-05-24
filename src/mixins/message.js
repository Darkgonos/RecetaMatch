import services from '../services.js';

export const messagesMixin = {
  data() {
    return {
      messages: [],
      displayedMessages: [],
      limit: 10,
      offset: 0,
    };
  },
  computed: {
    paginatedMessages() {
      return this.messages.slice(this.offset, this.offset + this.limit);
    },
    unreadMessagesCount() {
      return this.messages.filter(message => message.readit === 0).length;
    }
  },
  methods: {
    sendMessage(messageData) {
      return services.addMessage(messageData);
    },
    fetchMessages() {
      services.getMessage()
        .then((data) => {
          this.messages = data;
          this.displayedMessages = this.paginatedMessages;
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    },
    deleteMessage(messageID) {
      services.deleteMessage(messageID)
        .then(() => {
          this.messages = this.messages.filter((message) => message.id !== messageID);
          this.displayedMessages = this.paginatedMessages;
        })
        .catch((error) => {
          console.error("Error deleting message:", error);
        });
    },
    markMessageAsRead(message) {
      services.markMessageAsRead(message.id)
        .then((updatedMessage) => {
          const index = this.messages.findIndex(m => m.id === message.id);
          if (index !== -1) {
            this.messages.splice(index, 1, updatedMessage);
            this.displayedMessages = this.paginatedMessages;
          }
        })
        .catch((error) => {
          console.error("Error marking message as read:", error);
        });
    },
    loadMore() {
      this.offset += this.limit;
      this.displayedMessages = this.paginatedMessages;
    }
  },
  created() {
    this.fetchMessages();
  }
};
