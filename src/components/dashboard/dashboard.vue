<template>
  <div id="dashboard">
    <h1>Media Library</h1>
    <h3 class="catTitle">Categories</h3>
    <div class="sideNav">
      <ul>
        <li class="active">ctegory</li>
        <li>ctegory</li>
        <li>ctegory</li>
        <li>ctegory</li>
        <li>ctegory</li>
        <li>ctegory</li>
        <li>ctegory</li>
      </ul>
    </div>


    <div class="videoContainer">
      <h3 class="catTitle2"> Something Category</h3>

      <div class="videoContainer-video"  v-for=" video in videos" @click=" visibleNum(video.id)" :key="video.id">
        <video-clip :title="video.title" :id="video.id" :visible="visible"></video-clip>
      </div>

    </div>



  </div>
</template>

<script>
  import videoClip from './VideoClip.vue'

    export default {
        data() {
            return {
                visible: null,
                videos: [
                    {id: 1, title: 'one'},
                    {id: 2, title: 'two'},
                    {id: 3, title: 'three'},
                    {id: 4, title: 'four'},
                    {id: 5, title: 'five'}
                ]
            }
        },
        components: {
            videoClip
        },
        methods: {
            visibleNum(num) {
                this.visible = num;
            }
        },

    }
</script>



<style lang="scss" scoped>

  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }

  .catTitle {
    padding-left: 10px;
    width: 17%;
  }

  .catTitle2 {
    text-align: center;
  }

  .sideNav {
    float: left;
    width: 18%;
    background-color: #ddd;

    @media( max-width: 779px) {
      width: 40%;
    }

    & h3 {
      background-color: transparent;
    }

    & ul {
      padding-left: 0;
      margin: 0;

      & li {
        position: relative;
        padding: 15px 0 15px 10px;
        list-style: none;
        cursor: pointer;
        background-color: #f3efec;
        left: 0;
        border-bottom: solid 1px #f9f4f1;
        transition: all .5s;

        &:hover {
          background-color: #ddd;
          left: 7px;
        }

        &.active {
          background-color: #ddd;
          left: 7px;
        }
      }
    }
  }

  .videoContainer {
    position: relative;
    display: inline-block;
    width: 80%;
    float: right;
    top: -60px;
    /*border: solid 1px;*/

    @media( max-width: 779px) {
      width: 60%;
    }

    &-video {
      display: inline-block;
      width: 32%;
      margin-bottom: 15px;
      height: 240px;

      @media( max-width: 1160px) {
        width: 33%;
      }

      @media( max-width: 1160px) {
        width: 49%;
      }

      @media( max-width: 779px) {
        width: 100%;
      }
    }
  }
</style>