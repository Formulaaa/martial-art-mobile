<template>
  <HelloWorld msg="hello world!" />
  <a-button type="primary" @click="showMessage">hello</a-button>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'

const showMessage = () => {
  message.info('hello world!')
}
</script>

<style lang="scss" scoped></style>
