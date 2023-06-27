<template>
    <div class="panel">
        <div
            class="search animate__animated animate__bounceInDown"
            v-if="$route.name == `home`"
        >
            <input
                type="text"
                class="searchBar"
                v-model="keyWord"
                @keydown.enter="goSearch()"
                :placeholder="`搜索目前的${store.option.teitterCount}条忒文`"
            />
            <span
                @click="goSearch()"
                class="searchBtn iconfont icon-search"
            ></span>
        </div>
        <v-chart
            class="chart"
            :option="charOption"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref, toRefs, provide } from "vue";
    import { useTeitterStore } from "@/stores/teitter";
    import router from "@/router/index";
    import { use } from "echarts/core";
    import { CanvasRenderer } from "echarts/renderers";
    import { BarChart } from "echarts/charts";
    import {
        GridComponent,
        TitleComponent,
        TooltipComponent,
        LegendComponent,
    } from "echarts/components";
    import VChart, { THEME_KEY } from "vue-echarts";

    const store = useTeitterStore();
    const { userInfo, option } = toRefs(store);
    const keyWord = ref("");

    const goSearch = () => {
        console.log(keyWord.value);
        router.push({
            name: "search",
            params: {
                keyWord: keyWord.value,
            },
        });
    };

    use([
        GridComponent,
        CanvasRenderer,
        BarChart,
        TitleComponent,
        TooltipComponent,
        LegendComponent,
    ]);

    provide(THEME_KEY, "ligjt");

    const charOption = ref({
        title: {
            text: "粉丝排名",
            // subtext: "副标题",
            // left: "center",
        },
        tooltip: {
            // 提示框触发方式: item 只有在图形上才会触发, axis在范围内都会触发
            trigger: "axis",
            // 坐标轴指示器 line 线, shadow 阴影, cross , 十字线准星效果
            axisPointer: {
                type: "cross",
            },
            // 是否显示提示框
            showContent: true,
            // 样式
            backgroundColor: "#1d9bf0",
            textStyle: {
                color: "white",
                fontSize: "20",
            },
            // 内容格式化
            // formatter: (p) => {
            //     return "value=" + p;
            // },
        },
        xAxis: {
            type: "category",
            data: [
                "12312",
                "管理员大爹",
                "user01",
                "wdwad",
                "dawdwad",
                "1231231",
                "12",
            ],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: [15, 4, 2, 13, 12, 5, 16],
                type: "bar",
                showBackground: true,
                backgroundStyle: {
                    color: "rgba(180, 180, 180, 0.2)",
                },
                color: "#1d9bf0",
            },
        ],
    });
</script>

<style scoped lang="scss">
    .panel {
        z-index: 2;
        background-color: #f7f9f9;
        flex: 0.306;
        flex: 306;
        font-size: 1vmax;
        overflow: hidden;
        .search {
            padding: 2vmax;
            text-align: center;
            input {
                margin-left: -1vmax;
                width: 100%;
                height: 4vmax;
                border-radius: 2vmax;
                padding-left: 1vmax;
                font-size: 1.3vmax;
                background-color: #ffffff;
                outline: 0;
                border: 1px solid #47aef2;
                transition: all 200ms;

                &:focus,
                &:hover {
                    border: 1px dotted #1d9bf0;
                    outline: 0;
                    background-color: #eff3f4;
                }
            }
            .searchBtn {
                vertical-align: middle;
                margin-left: -5vmax;
                font-size: 3vmax;
                padding: 0.2vmax;
                border-radius: 50%;
                transition: all 0.2s;
                &:hover {
                    background-color: #d1d1d1;
                }
            }
        }
    }
    .chart {
        height: 400px;
    }
</style>
