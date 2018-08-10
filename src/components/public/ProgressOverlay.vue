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
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.content {
  position: absolute;
  width: 30%;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
</style>
