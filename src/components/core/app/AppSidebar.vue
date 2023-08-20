<script lang="ts" setup>
import IconLogout from "@/components/icons/IconLogout.vue";
import { useAuthStore } from "~/store/auth";

defineOptions({
    name: "AppSidebar",
});

defineProps({
    list: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
});

async function logout() {
    const authStore = useAuthStore();

    const { setUser, setAccessToken } = authStore;

    setUser(null);
    setAccessToken(null);

    await navigateTo({
        name: "login",
        replace: true,
    });
}
</script>

<template>
    <div class="w-full">
        <div class="h-full flex flex-col gap-y-7.5">
            <div class="max-w-45.5 mx-auto w-full py-7.5">
                <NuxtLink to="/" class="w-full h-full">
                    <img src="@/assets/img/datacorda-logo.png" alt="" />
                </NuxtLink>
            </div>
            <ul class="flex flex-col gap-y-2.5 transition-all">
                <li v-for="(item, index) in list" :key="index">
                    <NuxtLink
                        :to="{
                            name: item.name,
                        }"
                        class="group flex items-center gap-x-5 py-3.75 px-8.75 border-cl-purple-light transition-all duration-150"
                        :class="{
                            'bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50 border-r-6':
                                $route.name === item.name,
                            'hover:bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50':
                                $route.name !== item.name,
                        }"
                    >
                        <div class="w-8.75 text-white">
                            <component :is="item.icon"></component>
                        </div>
                        <span class="text-size_20/16 font-bold text-white">{{ item.label }}</span>
                    </NuxtLink>
                </li>
            </ul>

            <div class="mt-auto pb-6">
                <button
                    class="group flex items-center w-full gap-x-5 hover:bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50 py-3.75 px-8.75 transition-colors duration-150"
                    @click="logout"
                >
                    <div class="w-8.75 text-white">
                        <IconLogout />
                    </div>
                    <span class="text-size_20/16 font-bold text-white">Log Out</span>
                </button>
            </div>
        </div>
    </div>
</template>
