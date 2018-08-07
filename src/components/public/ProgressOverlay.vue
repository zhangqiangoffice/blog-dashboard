<template>
  <div class="overlay">
    <div class="content">
      <b-progress :value="100" variant="info" animated></b-progress>
    </div>
  </div>
</template>

<style>
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.content {
  width: 30%; 
  margin: 70px auto 0;
}
</style>
