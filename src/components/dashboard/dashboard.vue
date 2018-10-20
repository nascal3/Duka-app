<template>
  <div id="dashboard">
    <h1>Media Library</h1>

    <div class="categorynav">
      <CategoryNav :videos="results" @getCategory="sendCategory"></CategoryNav>
    </div>

    <div class="videoContainer">
      <h3 class="catTitle2"> {{categoryName}}</h3>

      <transition name="fade" mode="out-in">
        <div v-if="videos.length <= 0" class="loaderContainer">
          <div class="loaderContainer__text">Loading videos</div>
          <div class="loader">Loading videos...</div>
        </div>
      </transition>

      <transition-group name="zoom" mode="out-in">
        <div class="videoContainer-video" v-if="videos.length > 0" v-for=" video in videos" @click=" visibleNum(video.id)" :key="video.id">
          <video-clip :video = "video" :visible="visible"></video-clip>
        </div>
      </transition-group>

    </div>

  </div>
</template>

<script>
  import videoClip from './VideoClip.vue'
  import CategoryNav from './Catnav.vue'

    export default {
        data() {
            return {
                visible: null,
                categoryName: 'All categories',
                videos: []
            }
        },
        components: {
            videoClip,
            CategoryNav
        },
        methods: {
            visibleNum(num) {
                this.visible = num;
            },
            sendCategory(category) {
                if (category === null ) {
                    this.videos = this.results;
                    this.categoryName = 'All categories';
                    return;
                }

                const newResults = this.results.filter(video => video.category === category.id);
                this. categoryName = category.category_name;
                this.videos = newResults;
            }
        },
        computed: {
            results() {
                this.videos = this.$store.getters.getVideos;
                return this.$store.getters.getVideos;
            }
        },
        mounted() {
            this.$store.dispatch('fetchVideos');
        }

    }
</script>

<style lang="scss" scoped>

  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }

  .loaderContainer {
    position: relative;
    left: 50%;
    overflow: hidden;
    width: 550px;
    transform: translateX(-50%);

    &__text {
      text-align: center;
      font-size: 21px;
      margin-top: 15px;
      color: #521751;
    }
  }

  .catTitle2 {
    text-align: center;
  }

  .categorynav {
    float: left;
    width: 18%;
  }

  .videoContainer {
    width: 80%;
    float: right;
    margin-bottom: 50px;

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

  .fade-enter-active {
    animation: fade-in .8s ease-out forwards;
  }

  .fade-leave-active {
    animation: fade-in .8s ease-out reverse;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .zoom-enter-active {
    animation: zoom-in .8s ease-out forwards;
  }

  .zoom-leave-active {
    animation: zoom-in .8s ease-out reverse;
  }

  @keyframes zoom-in {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .loader {
    color: #521751;
    font-size: 90px;
    text-indent: -9999em;
    overflow: hidden;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin: 72px auto;
    position: relative;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
    animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  }
  @-webkit-keyframes load6 {
    0% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    5%,
    95% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    10%,
    59% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
    }
    20% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
    }
    38% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
    }
    100% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
  }
  @keyframes load6 {
    0% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    5%,
    95% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    10%,
    59% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
    }
    20% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
    }
    38% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
    }
    100% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
  }
  @-webkit-keyframes round {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes round {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
