<template>
    <userCard
        v-for="user in follower"
        :avatar-url="user.fansUserAvatar"
        :nick-name="user.fansUserNickname"
        :user-name="user.fansUsername"
        @click="goAccount(user.uid.toString())"
    ></userCard>
</template>

<script lang="ts">
    export default {
        name: "",
    };
</script>
<script setup lang="ts">
    import { reqFollower } from "@/api";
    import type {
        followingType,
        followerType,
    } from "@/interfaces/pubInterface";
    import { ref, type Ref } from "vue";
    import userCard from "./userCard.vue";
    import router from "@/router";
    const props = defineProps<{
        uid: string;
    }>();
    console.log(props.uid);
    const follower = ref([]) as Ref<followerType[]>;
    const getFollower = async () => {
        follower.value = await reqFollower(props.uid);
    };
    getFollower();
    const goAccount = (uid: string) => {
        router.push({
            name: "account",
            params: {
                userId: uid,
            },
        });
    };
</script>

<style scoped lang="less"></style>
