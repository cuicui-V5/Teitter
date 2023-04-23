<template>
    <div>关注者123</div>
    {{ following }}
    <userCard
        v-for="user in following"
        :user-info="user"
        @click="goAccount(user.uid.toString())"
    ></userCard>
</template>

<script lang="ts">
    export default {
        name: "",
    };
</script>
<script setup lang="ts">
    import { reqFollowing } from "@/api";
    import type { followingType } from "@/interfaces/pubInterface";
    import { ref, type Ref } from "vue";
    import userCard from "./userCard.vue";
    import router from "@/router";
    const props = defineProps<{
        uid: string;
    }>();
    console.log(props.uid);
    const following = ref([]) as Ref<followingType[]>;
    const getFollowing = async () => {
        following.value = await reqFollowing(props.uid);
    };
    getFollowing();
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
