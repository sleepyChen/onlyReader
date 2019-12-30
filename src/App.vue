<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<style lang="less">
body,html, .app{
  height: 100%;
}

p{
  margin: 0;
  padding: 0;
}

input{
  background-color: transparent;
  border: none;
}

.auto-img{
  display: block;
  width: 100%;
}

.ellipse{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lineClamp {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
</style>
