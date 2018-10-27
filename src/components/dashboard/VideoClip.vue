<template>
    <div>
        <div class="videoThumb">
            <img src="../../assets/vidThumb.jpg">
            <div class="videoThumb-title">
                {{video.name}}
            </div>
        </div>


        <el-dialog id="videoMode" :visible.sync="show" width="70%" :before-close="handleClose" center>
            <div class="modalVideoTitle">Video {{video.name}}</div>

            <video ref="videoPlayer" controls>
                <source :src="video.file_path" type="video/mp4">
                Your browser does not support the video tag.
            </video>

            <div class="modalVideoDesc">
                {{video.description}}
            </div>

        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false
            }
        },
        props: {
            video: {
                type: Object
            },
            visible: {
                type: Number
            }

        },
        methods: {
            handleClose() {
               const vid =  this.$refs.videoPlayer;
               vid.pause();
               this.show = false;
            }
        },
        watch: {
            visible() {
                this.show = this.video.id === this.visible;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .modalVideoTitle {
        position: relative;
        left: 18px;
        font-size: 18px;
        font-weight: 700;
    }

    .modalVideoDesc {
        position: relative;
        left: 18px;
        width: 97%;
    }

    video {
        width: 95%;
        margin-top: 15px;
        margin-bottom: 15px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .videoThumb {
        width: 300px;
        overflow: hidden;
        cursor: pointer;

        & img {
            max-width: 100%;
            position: relative;
            left: 10px;
        }

        &-title {
            position: relative;
            overflow: hidden;
            left: 51%;
            transform: translateX(-49%);
            font-weight: 300;
            font-size: 16px;
            width: 287px;
            cursor: pointer;
            height: 38px;
        }
    }


</style>
