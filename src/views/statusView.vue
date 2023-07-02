<template>
    <div class="container">
        <div class="title">统计信息</div>
        <div class="main">
            <v-chart
                class="chart"
                :option="charOption"
                :theme="store.isDarkMode ? 'dark' : 'light'"
            />
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "",
    };
</script>
<script setup lang="ts">
    import { ref, toRefs, provide } from "vue";

    import { use } from "echarts/core";
    import { CanvasRenderer } from "echarts/renderers";
    import { BarChart } from "echarts/charts";
    import {
        GridComponent,
        TitleComponent,
        TooltipComponent,
        LegendComponent,
    } from "echarts/components";
    import VChart from "vue-echarts";
    import { useTeitterStore } from "@/stores/teitter";
    import { reqFansChart } from "@/api";
    const store = useTeitterStore();
    use([
        GridComponent,
        CanvasRenderer,
        BarChart,
        TitleComponent,
        TooltipComponent,
        LegendComponent,
    ]);

    const charOption = ref({
        backgroundColor: "transparent",
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
            data: ["测试数据", "测试数据", "测试数据", "测试数据", "测试数据"],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: [1, 2, 4, 6, 10],
                type: "bar",
                showBackground: true,
                backgroundStyle: {
                    color: "rgba(180, 180, 180, 0.2)",
                },
                color: "#1d9bf0",
            },
        ],
    });

    const init = async () => {
        const res = await reqFansChart();
        console.log(res);
        charOption.value.xAxis.data = res.nickName;
        charOption.value.series[0].data = res.fansCount;
    };
    init();
</script>

<style scoped lang="less">
    .container {
        flex: 605;
        .title {
            z-index: 2;
            position: fixed;
            top: 0;
            // left: 8.3vmax;
            height: 5vmax;
            // width: 59.3vmax;
            width: 100%;
            font-weight: bold;
            font-size: 2vmax;
            line-height: 5vmax;
            user-select: none;
            text-indent: 2vmax;
            backdrop-filter: blur(30px);
            background-color: rgba(255, 255, 255, 0.8);
        }
        .main {
            padding-top: 5vmax;
        }
    }
    .chart {
        height: 80vh;
    }
</style>
