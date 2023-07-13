<script lang="ts" setup>
definePageMeta({
    middleware: [
        function (_, __) {
            if (process.client) {
                return navigateTo({
                    name: "analytics",
                });
            }
        },
    ],
});
</script>

<template>
    <div></div>
</template>
