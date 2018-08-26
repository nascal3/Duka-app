<template>
    <div>
        <div class="videoThumb">
            <img src="https://via.placeholder.com/300x200">
        </div>
        <div class="videoTitle">
           Video {{title}}
        </div>

        <el-dialog id="videoMode" :visible.sync="show" width="70%" center>
            <div class="modalVideoTitle">Video {{ title}}</div>

            <video controls>
                <source src="movie.mp4" type="video/mp4">
                <source src="movie.ogg" type="video/ogg">
                Your browser does not support the video tag.
            </video>

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
            title: {
                type: String
            },
            visible: {
                type: Number
            },
            id: {
                type: Number
            }

        },
        watch: {
            visible() {
                if(this.id === this.visible) {
                    this.show = true;
                } else {
                    this.show =  false;
                }
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

    video {
        width: 95%;
        margin-top: 15px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .videoThumb {
        width: 300px;
        height: 200px;
        overflow: hidden;
        cursor: pointer;

        & img {
            max-width: 100%;
            position: relative;
            left: 10px;
        }
    }

    .videoTitle {
        position: relative;
        left: 54%;
        transform: translateX(-50%);
        top: 9px;
        font-weight: 700;
        font-size: 16px;
        width: 300px;
        cursor: pointer;
    }

</style>