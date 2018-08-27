<template>
  <div id="dashboard">
    <h1>Media Library</h1>

    <div class="categorynav">
      <CategoryNav :videos="results" @getCategory="sendCategory"></CategoryNav>
    </div>

    <div class="videoContainer">
      <h3 class="catTitle2"> {{categoryName}}</h3>

      <div v-if="videos.length <= 0" class="loaderContainer">
        <img src="../../assets/loader.gif" alt="loader image">
      </div>
      <div class="videoContainer-video" v-if="videos.length > 0" v-for=" video in videos" @click=" visibleNum(video.id)" :key="video.id">
        <video-clip :video = "video" :visible="visible"></video-clip>
      </div>

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

    & img {
      max-width: 100%;
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