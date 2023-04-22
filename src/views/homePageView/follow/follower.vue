<template>
    <div>关注者123</div>
    {{ follower }}
    <userCard
        v-for="user in follower"
        :user-info="user"
    ></userCard>
</template>

<script lang="ts">
    export default {
        name: "",
    };
</script>
<script setup lang="ts">
    import { reqFollower } from "@/api";
    import type { followingType } from "@/interfaces/pubInterface";
    import { ref, type Ref } from "vue";
    import userCard from "./userCard.vue";
    const props = defineProps<{
        uid: string;
    }>();
    console.log(props.uid);
    const follower = ref([]) as Ref<followingType[]>;
    const getFollower = async () => {
        follower.value = await reqFollower(props.uid);
    };
    getFollower();
</script>

<style scoped lang="less"></style>
