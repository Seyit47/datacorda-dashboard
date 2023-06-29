<script lang="ts" setup>
import IconDaily from "@/components/icons/IconDaily.vue";
import IconDashboard from "@/components/icons/IconDashboard.vue";
import IconFunnel from "@/components/icons/IconFunnel.vue";
import IconLevelFlow from "@/components/icons/IconLevelFlow.vue";
import IconLogout from "@/components/icons/IconLogout.vue";

defineOptions({
    name: "AppSidebar",
});
</script>

<template>
    <div class="w-full">
        <div class="h-full flex flex-col gap-y-3.75">
            <div class="flex items-center justify-center py-3.75">
                <NuxtLink to="/" class="w-54 px-2.5 py-4">
                    <img src="@/assets/img/datacorda-logo.png" alt="" />
                </NuxtLink>
            </div>
            <ul class="flex flex-col gap-y-2.5 px-5">
                <li>
                    <NuxtLink
                        :to="{
                            name: 'index',
                        }"
                        class="group flex items-center gap-x-3.75 hover:bg-white hover:text-cl-main rounded-xl py-3.75 px-3.75 transition-colors duration-150"
                        exact-active-class="bg-white text-cl-main"
                        active-class=""
                    >
                        <div class="w-8.75">
                            <IconDaily />
                        </div>
                        <span class="text-size_20/16">Daily</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/"
                        class="group flex items-center gap-x-3.75 hover:bg-white rounded-xl py-3.75 px-3.75 transition-colors duration-150"
                    >
                        <div
                            class="w-8.75 text-white group-hover:text-cl-main transition-colors duration-150"
                        >
                            <IconDashboard />
                        </div>
                        <span
                            class="text-size_20/16 text-white group-hover:text-cl-main transition-colors duration-150"
                            >Dashboard</span
                        >
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/"
                        class="group flex items-center gap-x-3.75 hover:bg-white rounded-xl py-3.75 px-3.75 transition-colors duration-150"
                    >
                        <div
                            class="w-8.75 text-white group-hover:text-cl-main transition-colors duration-150"
                        >
                            <IconFunnel />
                        </div>
                        <span
                            class="text-size_20/16 text-white group-hover:text-cl-main transition-colors duration-150"
                            >Funnels</span
                        >
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/"
                        class="group flex items-center gap-x-3.75 hover:bg-white rounded-xl py-3.75 px-3.75 transition-colors duration-150"
                    >
                        <div
                            class="w-8.75 text-white group-hover:text-cl-main transition-colors duration-150"
                        >
                            <IconLevelFlow />
                        </div>
                        <span
                            class="text-size_20/16 text-white group-hover:text-cl-main transition-colors duration-150"
                            >Level-flow</span
                        >
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/"
                        class="group flex items-center gap-x-3.75 hover:bg-white rounded-xl py-3.75 px-3.75 transition-colors duration-150"
                    >
                        <div
                            class="w-8.75 text-white group-hover:text-cl-main transition-colors duration-150"
                        >
                            <IconDaily />
                        </div>
                        <span
                            class="text-size_20/16 text-white group-hover:text-cl-main transition-colors duration-150"
                            >Daily</span
                        >
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/"
                        class="group flex items-center gap-x-3.75 hover:bg-white rounded-xl py-3.75 px-3.75 transition-colors duration-150"
                    >
                        <div
                            class="w-8.75 text-white group-hover:text-cl-main transition-colors duration-150"
                        >
                            <IconDashboard />
                        </div>
                        <span
                            class="text-size_20/16 text-white group-hover:text-cl-main transition-colors duration-150"
                            >Dashboard</span
                        >
                    </NuxtLink>
                </li>
            </ul>

            <div class="mt-auto px-6 pb-6">
                <NuxtLink
                    to="/"
                    class="group flex items-center gap-x-3.75 hover:bg-white rounded-xl py-3.75 px-3.75 transition-colors duration-150"
                >
                    <div
                        class="w-8.75 text-white group-hover:text-cl-main transition-colors duration-150"
                    >
                        <IconLogout />
                    </div>
                    <span
                        class="text-size_20/16 text-white group-hover:text-cl-main transition-colors duration-150"
                        >Logout</span
                    >
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
